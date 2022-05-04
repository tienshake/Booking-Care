import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ManageDoctor.scss';
import * as actions from '../../../store/actions';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';

// import style manually
import Select from 'react-select';
import { LANGUAGES, CRUD_ACTION } from '../../../utils';
import { getDetailDoctorById } from '../../../services/userService';
// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
class ManageDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //save mardown table
            contentMarkdown: "",
            contentHTML: "",
            selectedDoctor: "",
            description: "",
            arrDoctor: [],
            hasOldData: false,
            action: "",
            //doctor infor table
            listPrice: [],
            listProvince: [],
            listPayment: [],
            listClinic: [],
            listSpecialty: [],
            selectedPrice: '',
            selectedProvince: '',
            selectedPayment: '',
            selectedClinic: '',
            selectedSpecialty: '',
            nameClinic: '',
            addressClinic: '',
            note: '',

        }
    }
    componentDidMount() {
        this.props.fetchAllDoctorRedux();
        this.props.getRequireDoctorInfoRedux();
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.doctors !== this.props.doctors) {
            const dataSelect = this.buildDataInputSelect(this.props.doctors, "USERS")
            this.setState({
                arrDoctor: dataSelect,
            })
        }
        if (prevProps.language !== this.props.language) {
            const dataSelect = this.buildDataInputSelect(this.props.doctors, "USERS")
            this.setState({
                arrDoctor: dataSelect,
            })
        }
        if (prevProps.allRequireDoctorInfo !== this.props.allRequireDoctorInfo) {
            const { resPrice, resPayment, resProvince, resSpecialty } = this.props.allRequireDoctorInfo;
            const dataSelectPrice = this.buildDataInputSelect(resPrice, "PRICE");
            const dataSelectPayment = this.buildDataInputSelect(resPayment, "PAYMENT");
            const dataSelectProvince = this.buildDataInputSelect(resProvince, "PROVINCE");
            const dataSelectSpecialty = this.buildDataInputSelect(resSpecialty, "SPECIALTY");
            this.setState({
                listPrice: dataSelectPrice,
                listProvince: dataSelectProvince,
                listPayment: dataSelectPayment,
                listSpecialty: dataSelectSpecialty
            })
        }
        if (prevProps.language !== this.props.language) {
            const { resPrice, resPayment, resProvince, resSpecialty } = this.props.allRequireDoctorInfo;
            const dataSelectPrice = this.buildDataInputSelect(resPrice, "PRICE");
            const dataSelectPayment = this.buildDataInputSelect(resPayment, "PAYMENT");
            const dataSelectProvince = this.buildDataInputSelect(resProvince, "PROVINCE");

            this.setState({
                listPrice: dataSelectPrice,
                listProvince: dataSelectProvince,
                listPayment: dataSelectPayment,

            })
        }

    }
    buildDataInputSelect = (data, type) => {
        let result = [];
        let { language } = this.props
        if (data && data.length > 0) {
            if (type === 'USERS') {
                data.map((item, index) => {
                    let oject = {};
                    const labelVi = `${item.firstName} ${item.lastName}`;
                    const labelEn = `${item.lastName} ${item.firstName}`;
                    oject.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    oject.value = type === 'USERS' ? item.id : item.keyMap
                    result.push(oject);
                })
            }
            if (type === 'PRICE') {
                data.map((item, index) => {
                    let oject = {};
                    const formatPrice = item.valueVi.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                    const labelVi = `${formatPrice} VNĐ`;
                    const labelEn = `${item.valueEn} USD`;
                    oject.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    oject.value = type === 'USERS' ? item.id : item.keyMap
                    result.push(oject);
                })
            }
            if (type === 'PAYMENT') {
                data.map((item, index) => {
                    let oject = {};
                    const labelVi = item.valueVi;
                    const labelEn = item.valueEn;
                    oject.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    oject.value = type === 'USERS' ? item.id : item.keyMap
                    result.push(oject);
                })
            }
            if (type === 'PROVINCE') {
                data.map((item, index) => {
                    let oject = {};
                    const labelVi = item.valueVi;
                    const labelEn = item.valueEn;
                    oject.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    oject.value = type === 'USERS' ? item.id : item.keyMap
                    result.push(oject);
                })
            }
            if (type === 'SPECIALTY') {
                data.map((item, index) => {
                    let oject = {};
                    const label = item.name;
                    oject.label = label;
                    oject.value = item.id
                    result.push(oject);
                })
            }
        }
        return result;
    }
    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html
        })
    }
    handleSaveContentMarkdown = () => {
        console.log('this.state.selectedSpecialty.value :>> ', this.state.selectedSpecialty.value);
        const { hasOldData } = this.state;
        this.props.saveDetailDoctorRedux({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedDoctor.value,
            action: hasOldData ? CRUD_ACTION.EDIT : CRUD_ACTION.CREATE,

            selectedPrice: this.state.selectedPrice.value,
            selectedProvince: this.state.selectedProvince.value,
            selectedPayment: this.state.selectedPayment.value,
            nameClinic: this.state.nameClinic,
            addressClinic: this.state.addressClinic,
            note: this.state.note,
            clinicId: this.state.clinicId && this.state.clinicId.value ? this.state.clinicId.value : '',
            specialtyId: this.state.selectedSpecialty.value
        })
    }

    handleChangeSelected = async (selectedDoctor) => {
        this.setState({ selectedDoctor });
        const res = await getDetailDoctorById(selectedDoctor.value);
        if (res && res.errCode === 0 && res.data && res.data.Markdown) {
            const markdown = res.data.Markdown;
            let nameClinic = ''; let addressClinic = ''; let note = '';
            let provinceId = ''; let priceId = ''; let paymentId = '';
            let specialtyId = '';
            let selectedProvince = '';
            let selectedPrice = "";
            let selectedPayment = "";
            let selectedSpecialty = "";
            if (res.data.Doctor_Infor) {
                const { listPayment, listPrice, listProvince, listSpecialty } = this.state;
                nameClinic = res.data.Doctor_Infor.nameClinic;
                addressClinic = res.data.Doctor_Infor.addressClinic;
                note = res.data.Doctor_Infor.note;
                provinceId = res.data.Doctor_Infor.provinceId;
                priceId = res.data.Doctor_Infor.priceId;
                paymentId = res.data.Doctor_Infor.paymentId;
                specialtyId = res.data.Doctor_Infor.specialtyId;
                selectedProvince = listProvince.find(item => item.value === provinceId);
                selectedPrice = listPrice.find(item => item.value === priceId);
                selectedPayment = listPayment.find(item => item.value === paymentId);
                selectedSpecialty = listSpecialty.find(item => item.value === specialtyId);
            }
            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                hasOldData: true,
                nameClinic: nameClinic,
                addressClinic: addressClinic,
                note: note,
                selectedProvince,
                selectedPrice,
                selectedPayment,
                selectedSpecialty
            })
        } else {
            this.setState({
                contentHTML: "",
                contentMarkdown: "",
                description: "",
                hasOldData: false,
                nameClinic: '',
                addressClinic: '',
                note: '',
                selectedProvince: '',
                selectedPrice: '',
                selectedPayment: ''
            })
        }
    };
    handleChangeSelectedDoctorInfo = async (selectedOption, name) => {
        const stateCopy = { ...this.state }
        stateCopy[name.name] = selectedOption
        this.setState({
            ...stateCopy
        })
    };
    handleChangeText = (e, id) => {
        const copyState = { ...this.state };
        copyState[id] = e.target.value
        this.setState({
            ...copyState
        })
    }
    render() {
        const { hasOldData, selectedSpecialty } = this.state;
        console.log(selectedSpecialty);
        return (
            <div className="manage-doctor">
                <div className="manage-doctor__title">
                    <FormattedMessage id="admin.manage-doctor.title" />
                </div>
                <div className="manage-doctor__more-info">
                    <div className="manage-doctor__content-left form-group">
                        <label><FormattedMessage id="admin.manage-doctor.choose-doctor" /></label>
                        <Select
                            value={this.state.selectedDoctor}
                            onChange={this.handleChangeSelected}
                            options={this.state.arrDoctor}
                            placeholder={<FormattedMessage id="admin.manage-doctor.choose-doctor" />}
                        />
                    </div>
                    <div className="manage-doctor__content-right form-group">
                        <label> <FormattedMessage id="admin.manage-doctor.information" /></label>
                        <textarea className="form-control manage-doctor_control"
                            onChange={(e) => this.handleChangeText(e, 'description')}
                            value={this.state.description}
                        >

                        </textarea>
                    </div>

                </div>


                <div className="manage-doctor__doctor-info row">
                    <div className="col-4 form-group">
                        <label><FormattedMessage id="admin.manage-doctor.price" /></label>
                        <Select
                            value={this.state.selectedPrice}
                            onChange={this.handleChangeSelectedDoctorInfo}
                            options={this.state.listPrice}
                            placeholder={<FormattedMessage id="admin.manage-doctor.price" />}
                            name="selectedPrice"
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label> <FormattedMessage id="admin.manage-doctor.payment" /></label>
                        <Select
                            value={this.state.selectedPayment}
                            onChange={this.handleChangeSelectedDoctorInfo}
                            options={this.state.listPayment}
                            placeholder={<FormattedMessage id="admin.manage-doctor.payment" />}
                            name="selectedPayment"

                        />
                    </div>
                    <div className="col-4 form-group">
                        <label> <FormattedMessage id="admin.manage-doctor.province" /></label>
                        <Select
                            value={this.state.selectedProvince}
                            onChange={this.handleChangeSelectedDoctorInfo}
                            options={this.state.listProvince}
                            placeholder={<FormattedMessage id="admin.manage-doctor.province" />}
                            name="selectedProvince"
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label> <FormattedMessage id="admin.manage-doctor.name-clinic" /></label>
                        <input className="form-control manage-doctor_input"
                            onChange={(e) => this.handleChangeText(e, 'nameClinic')}
                            value={this.state.nameClinic}
                        ></input>
                    </div>
                    <div className="col-4 form-group">
                        <label> <FormattedMessage id="admin.manage-doctor.address-clinic" /></label>
                        <input className="form-control manage-doctor_input"
                            onChange={(e) => this.handleChangeText(e, 'addressClinic')}
                            value={this.state.addressClinic}
                        ></input>
                    </div>
                    <div className="col-4 form-group">
                        <label> <FormattedMessage id="admin.manage-doctor.note" /></label>
                        <input className="form-control manage-doctor_input"
                            onChange={(e) => this.handleChangeText(e, 'note')}
                            value={this.state.note}
                        ></input>
                    </div>

                </div>
                <div className="row">
                    <div className="col-4 form-group">
                        <label>Chọn chuyên khoa</label>
                        <Select
                            value={this.state.selectedSpecialty}
                            onChange={this.handleChangeSelectedDoctorInfo}
                            options={this.state.listSpecialty}
                            // placeholder={<FormattedMessage id="admin.manage-doctor.payment" />}
                            name="selectedSpecialty"

                        />
                    </div>
                    <div className="col-4 form-group">
                        <label>Chọn phòng khám</label>
                        <Select
                            value={this.state.selectedClinic}
                            onChange={this.handleChangeSelectedDoctorInfo}
                            options={this.state.selectedClinic}
                            // placeholder={<FormattedMessage id="admin.manage-doctor.payment" />}
                            name="selectedClinic"

                        />
                    </div>
                </div>
                <div className="manage-doctor__edit">
                    <MdEditor
                        value={this.state.contentMarkdown}
                        style={{ height: '300px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                    />

                </div>

                <button
                    className={hasOldData === true ? "manage-doctor__btn-save" : " manage-doctor__btn-create"}
                    onClick={() => this.handleSaveContentMarkdown()}
                >{hasOldData ? <FormattedMessage id="admin.manage-doctor.add" /> : <FormattedMessage id="admin.manage-doctor.save" />}</button>
            </div>

        );
    }

}

const mapStateToProps = state => {
    return {
        users: state.admin.users,
        doctors: state.admin.allDoctor,
        language: state.app.language,
        allRequireDoctorInfo: state.admin.allRequireDoctorInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctorRedux: () => dispatch(actions.fetchAllDoctor()),
        getRequireDoctorInfoRedux: () => dispatch(actions.getRequireDoctorInfo()),
        saveDetailDoctorRedux: (data) => dispatch(actions.saveDetailDoctor(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);

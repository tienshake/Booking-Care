import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './BookingModal.scss';
import { Modal } from 'reactstrap';
import ProfileDoctor from '../ProfileDoctor';
import _ from 'lodash';
import moment from 'moment';
import localization from 'moment/locale/vi';
import DatePicker from '../../../../components/Input/DatePicker';
import * as actions from '../../../../store/actions'
import { LANGUAGES } from '../../../../utils';
import Select from 'react-select';
import { postPatientBookingAppointment } from '../../../../services/userService';
import { toast } from 'react-toastify';
class BookingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            phoneNumber: '',
            email: '',
            address: '',
            reason: '',
            birthDate: '',
            genders: '',
            doctorId: '',
            selectedGender: '',
            timeType: ''
        }
    }
    async componentDidMount() {
        this.props.fetchGenderStart();
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.language !== this.props.language) {
            this.setState({ genders: this.buildDataGender(this.props.genders) });
        }
        if (prevProps.genders !== this.props.genders) {
            this.setState({ genders: this.buildDataGender(this.props.genders) });
        }
        if (prevProps.dataTimeModalSchedule !== this.props.dataTimeModalSchedule) {
            if (this.props.dataTimeModalSchedule && !_.isEmpty(this.props.dataTimeModalSchedule)) {

                this.setState({
                    doctorId: this.props.dataTimeModalSchedule.doctorId,
                    timeType: this.props.dataTimeModalSchedule.timeType
                });
            }
        }
    }
    buildDataGender = (data) => {
        let result = [];
        const language = this.props.language;
        if (data && data.length > 0) {
            data.map((item, index) => {
                const object = {};
                object.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
                object.value = item.keyMap;
                result.push(object);
            })
        }
        return result;
    }
    handleOnChangeInput = (e, id) => {
        const value = e.target.value;
        const copyState = { ...this.state };
        copyState[id] = value;
        this.setState({ ...copyState });
    };
    handleOnchangeDatePicker = (date) => {
        this.setState({ birthDate: date[0] });
    };
    handleOnchangeSelect = (select) => {
        this.setState({ selectedGender: select });
    }

    buildTimeBooking = (dataTime) => {
        const { language } = this.props;
        if (dataTime && !_.isEmpty(dataTime)) {
            const time = language === LANGUAGES.VI ? dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn;
            const data = language === LANGUAGES.VI ? moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY')
                :
                moment.unix(+dataTime.date / 1000).locale('en').format('ddd - MM/DD/YYYY');
            return `${time} - ${data}`
        }
        return <></>
    };
    buildDoctorName = (dataTime) => {
        const { language } = this.props;
        if (dataTime && !_.isEmpty(dataTime)) {
            const name = language === LANGUAGES.VI ? `${dataTime.doctorData.firstName} ${dataTime.doctorData.lastName}`
                : `${dataTime.doctorData.lastName} ${dataTime.doctorData.firstName} `;
            return name;
        }
        return <></>
    };
    handleConfirmBooking = async () => {
        console.log(this.state);
        // !data.email || !data.doctorId || !data.timeType || !data.date
        const date = new Date(this.state.birthDate).getTime();
        const timeString = this.buildTimeBooking(this.props.dataTimeModalSchedule);
        const doctorName = this.buildDoctorName(this.props.dataTimeModalSchedule)
        try {
            const res = await postPatientBookingAppointment({
                fullName: this.state.fullName,
                phoneNumber: this.state.phoneNumber,
                email: this.state.email,
                address: this.state.address,
                reason: this.state.reason,
                date: date,
                selectedGender: this.state.selectedGender.value,
                doctorId: this.state.doctorId,
                timeType: this.state.timeType,
                language: this.props.language,
                time: timeString,
                doctorName: doctorName
            });
            if (res && res.errCode === 0) {
                toast.success('Save info user success');
                this.props.handleCloseModalBooking();
            } else {
                toast.error('Save info user error')
            }

        } catch (e) {
            toast.error('Save info user error', e)
            console.log(e);
        }
    };
    render() {
        const {
            isOpenModalBooking,
            handleCloseModalBooking,
            dataTimeModalSchedule,
        } = this.props;
        let doctorId = '';
        if (dataTimeModalSchedule && !_.isEmpty(dataTimeModalSchedule)) {
            doctorId = dataTimeModalSchedule.doctorId
        }
        return (
            <Modal
                isOpen={isOpenModalBooking}
                className={'hello'}
                size="lg"
                className={'booking-modal-container'}
                centered
            >
                <div className="booking-modal__content">
                    <div className="booking-modal__header">
                        <span className="left">Thông tin đặc lịch khám bệnh</span>
                        <span onClick={handleCloseModalBooking} className="right"><i className="fas fa-times"></i></span>
                    </div>
                    <div className="booking-modal__body container">
                        <div className="booking-modal__info">
                            <ProfileDoctor
                                doctorId={doctorId}
                                isShowDescriptionDoctor={false}
                                dataTimeModalSchedule={dataTimeModalSchedule}
                            />
                        </div>
                        <div className="row">
                            <div className="col-6 form-group">
                                <label>Họ tên</label>
                                <input className="form-control"
                                    value={this.state.fullName}
                                    onChange={(e) => this.handleOnChangeInput(e, 'fullName')}
                                />
                            </div>
                            <div className="col-6 form-group">
                                <label>Số điện thoại</label>
                                <input className="form-control"
                                    value={this.state.phoneNumber}
                                    onChange={(e) => this.handleOnChangeInput(e, 'phoneNumber')}
                                />
                            </div>
                            <div className="col-6 form-group">
                                <label>Địa chỉ email</label>
                                <input className="form-control"
                                    value={this.state.email}
                                    onChange={(e) => this.handleOnChangeInput(e, 'email')}
                                />
                            </div>
                            <div className="col-6 form-group">
                                <label>Địa chỉ liên hệ</label>
                                <input className="form-control"
                                    value={this.state.address}
                                    onChange={(e) => this.handleOnChangeInput(e, 'address')}
                                />
                            </div>
                            <div className="col-12 form-group">
                                <label>Lý do khám</label>
                                <input className="form-control modal__why"
                                    value={this.state.reason}
                                    onChange={(e) => this.handleOnChangeInput(e, 'reason')}
                                />
                            </div>
                            <div className="col-6 form-group">
                                <label>Ngày sinh</label>
                                <DatePicker
                                    onChange={this.handleOnchangeDatePicker}
                                    className="form-control"
                                    selected={this.state.birthDate}
                                // minDate={yesterday}
                                />
                            </div>
                            <div className="col-6 form-group">
                                <label>Giới tính</label>
                                <Select
                                    value={this.state.selectedGender}
                                    onChange={this.handleOnchangeSelect}
                                    options={this.state.genders}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="booking-modal__footer">
                        <button className="btn-booking-confirm"
                            onClick={() => this.handleConfirmBooking()}
                        >Xác nhận</button>
                        <button onClick={handleCloseModalBooking} className="btn-booking-cancel">Hủy</button>
                    </div>


                </div>
            </Modal >
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genders: state.admin.gender,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchGenderStart: () => dispatch(actions.fetchGenderStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);

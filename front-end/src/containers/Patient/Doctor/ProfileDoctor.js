import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ProfileDoctor.scss';
import { getProfileDoctorById } from '../../../services/userService'
import { LANGUAGES } from '../../../utils';
import NumberFormat from 'react-number-format';
import _ from 'lodash';
import moment from 'moment';
import localization from 'moment/locale/vi';
import { Link } from 'react-router-dom'
class ProfileDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataProfile: {}
        }
    }
    async componentDidMount() {
        const data = await this.getInfoDoctor(this.props.doctorId);
        if (data) {
            this.setState({ dataProfile: data });
        }
    }
    async componentDidUpdate(prevProps, prevState) {
        if (prevProps.doctorId !== this.props.doctorId) {
            console.log('this.props.doctorId :>> ', this.props.doctorId);
            const data = await this.getInfoDoctor(this.props.doctorId);
            if (data) {
                this.setState({ dataProfile: data });
                console.log(data);
            }

        }
        if (prevProps.language !== this.props.language) {
            const data = await this.getInfoDoctor(this.props.doctorId);
            if (data) {
                this.setState({ dataProfile: data });
                console.log(data);
            }
        }
    }
    getInfoDoctor = async (id) => {
        let result = {};
        try {
            if (id) {
                const res = await getProfileDoctorById(id);
                console.log('res', res)
                if (res && res.errCode === 0) {
                    result = res.data
                }
            }
        } catch (e) {
            console.log(e);
        }
        return result;
    };
    renderTimeBooking = (dataTime) => {
        const { language } = this.props;
        if (dataTime && !_.isEmpty(dataTime)) {
            const time = language === LANGUAGES.VI ? dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn;
            const data = language === LANGUAGES.VI ? moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY')
                :
                moment.unix(+dataTime.date / 1000).locale('en').format('ddd - MM/DD/YYYY');
            return (
                <>
                    <div>{time} - {data}</div>
                    <div>Miễn phí đặt lịch</div>
                </>
            )
        }
        return <></>
    };
    render() {
        const { dataProfile } = this.state;
        const { language, dataTimeModalSchedule } = this.props;
        let nameVi = "";
        let nameEn = "";
        if (dataProfile && dataProfile.positionData) {
            nameVi = `${dataProfile.positionData.valueVi}, ${dataProfile.firstName}  ${dataProfile.lastName}`;
            nameEn = `${dataProfile.positionData.valueEn}, ${dataProfile.lastName} ${dataProfile.firstName}`;
        };
        return (
            <div className="profile-doctor">
                <div className="intro-doctor">
                    <div className="content-left"  >
                        <div
                            className="doctor-detail__img"
                            style={{ backgroundImage: `url(${dataProfile && dataProfile.image ? dataProfile.image : ''})` }}
                        >

                        </div>
                    </div>
                    <div className="content-right">
                        <div className="content-right__wrap">
                            <div className="content-right__up">
                                {language === LANGUAGES.VI ? nameVi : nameEn}

                            </div>
                            <div className="content-right__down">
                                {this.props.isShowDescriptionDoctor ?
                                    <>
                                        {
                                            dataProfile
                                            && dataProfile.Markdown
                                            && dataProfile.Markdown.description
                                            && <span>{dataProfile.Markdown.description}</span>
                                        }
                                    </>

                                    :
                                    <>
                                        {this.renderTimeBooking(dataTimeModalSchedule)}
                                    </>
                                }
                            </div>

                        </div>
                    </div>
                </div>
                <div className="price">

                    {dataProfile && dataProfile.Doctor_Infor ?
                        <>
                            {this.props.isShowDescriptionDoctor ?
                                <Link className="more" to={`/detail-doctor/${this.props.doctorId}`}>xem thêm</Link> :
                                <>
                                    <span >Giá Khám:</span>
                                    <NumberFormat
                                        value={dataProfile && dataProfile.Doctor_Infor && language === LANGUAGES.VI ?
                                            `${dataProfile.Doctor_Infor.priceTypeData.valueVi}VNĐ` : ''
                                        }
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        suffix={language === LANGUAGES.VI ? 'VNĐ' : '$'}
                                    />
                                    <NumberFormat
                                        value={dataProfile && dataProfile.Doctor_Infor && language === LANGUAGES.EN ?
                                            `${dataProfile.Doctor_Infor.priceTypeData.valueEn}$` : ''
                                        }
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        suffix={language === LANGUAGES.VI ? 'VNĐ' : '$'}
                                    />
                                </>


                            }

                        </>
                        :
                        ''
                    }

                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);

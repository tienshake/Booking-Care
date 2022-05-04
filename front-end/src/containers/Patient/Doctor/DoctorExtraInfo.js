import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './DoctorExtraInfo.scss';
import * as actions from '../../../store/actions';
import NumberFormat from 'react-number-format';
import { LANGUAGES } from '../../../utils';
import { getExtraInfoDoctorById } from '../../../services/userService';
class DoctorExtraInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowDetailDoctor: false,
            extraInfoDoctor: {}
        }
    }
    async componentDidMount() {
        if (this.props.idDoctor) {
            const res = await getExtraInfoDoctorById(this.props.idDoctor);
            if (res && res.errCode === 0) {
                if (this.props.extraInfoDoctorRedux) {
                    this.setState({ extraInfoDoctor: res.data });
                }
            }
        }
    }
    async componentDidUpdate(prevProps, prevState) {
        if (prevProps.idDoctor !== this.props.idDoctor) {
            const res = await getExtraInfoDoctorById(this.props.idDoctor);
            if (res && res.errCode === 0) {
                if (this.props.extraInfoDoctorRedux) {
                    this.setState({ extraInfoDoctor: res.data });
                }
            }
        }
    }
    handleShowHide = (status) => {
        this.setState({ isShowDetailDoctor: status })
    };
    render() {
        const { isShowDetailDoctor, extraInfoDoctor } = this.state;
        const { language } = this.props
        return (
            <div className="doctor-extra-info__container">
                <div className="content__up">
                    <div className="text__address"><FormattedMessage id="patient.extra-info-doctor.address-examination" /></div>
                    <div className="name__clinic">
                        {extraInfoDoctor && extraInfoDoctor.nameClinic ? extraInfoDoctor.nameClinic : ''}
                    </div>
                    <div className="detail__address">
                        {extraInfoDoctor && extraInfoDoctor.addressClinic ? extraInfoDoctor.addressClinic : ''}
                    </div>
                </div>
                <div className="content__down">

                    {isShowDetailDoctor === false ?
                        <div>
                            <FormattedMessage id="patient.extra-info-doctor.price-examination-up" />: <span className="examination-price">
                                <NumberFormat
                                    value={
                                        language === LANGUAGES.VI ?
                                            extraInfoDoctor
                                                && extraInfoDoctor.priceTypeData
                                                && extraInfoDoctor.priceTypeData.valueVi
                                                ? extraInfoDoctor.priceTypeData.valueVi : ''
                                            :
                                            extraInfoDoctor
                                                && extraInfoDoctor.priceTypeData
                                                && extraInfoDoctor.priceTypeData.valueEn
                                                ? extraInfoDoctor.priceTypeData.valueEn : ''
                                    }
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={language === LANGUAGES.VI ? 'VNĐ' : '$'}
                                />
                                .
                            </span>
                            <span
                                className="btn-show"
                                onClick={() => this.handleShowHide(true)}
                            >
                                <FormattedMessage id="patient.extra-info-doctor.see-details" />
                            </span>
                        </div>
                        :
                        <>
                            <div className="price"><FormattedMessage id="patient.extra-info-doctor.price-examination-up" />:</div>
                            <div className="detail-view">
                                <div className="detail-view__up">
                                    <div className="detail-view__price"><span><FormattedMessage id="patient.extra-info-doctor.price-examination-down" /></span>
                                        <span className="examination-price">
                                            <NumberFormat
                                                value={
                                                    language === LANGUAGES.VI ?
                                                        extraInfoDoctor
                                                            && extraInfoDoctor.priceTypeData
                                                            && extraInfoDoctor.priceTypeData.valueVi
                                                            ? extraInfoDoctor.priceTypeData.valueVi : ''
                                                        :
                                                        extraInfoDoctor
                                                            && extraInfoDoctor.priceTypeData
                                                            && extraInfoDoctor.priceTypeData.valueEn
                                                            ? extraInfoDoctor.priceTypeData.valueEn : ''
                                                }
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                suffix={language === LANGUAGES.VI ? 'VNĐ' : '$'}
                                            />
                                        </span>
                                    </div>
                                    {extraInfoDoctor && extraInfoDoctor.note ? extraInfoDoctor.note : ''}
                                </div>
                                <div className="detail-view__down">
                                    <FormattedMessage id="patient.extra-info-doctor.text-payments" />:
                                    {language === LANGUAGES.VI
                                        ? extraInfoDoctor.paymentTypeData && extraInfoDoctor.paymentTypeData ? extraInfoDoctor.paymentTypeData.valueVi
                                            : ''
                                        : extraInfoDoctor.paymentTypeData && extraInfoDoctor.paymentTypeData ? extraInfoDoctor.paymentTypeData.valueEn
                                            : ''
                                    }
                                </div>
                            </div>
                            <div
                                className="btn-hidden"
                                onClick={() => this.handleShowHide(false)}
                            >
                                <FormattedMessage id="patient.extra-info-doctor.hide-price-list" />
                            </div>
                        </>
                    }


                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        extraInfoDoctorRedux: state.admin.extraInfoDoctor,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getExtraInfoDoctorByIdRedux: (id) => dispatch(actions.fetchExtraInfoDoctorById(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfo);

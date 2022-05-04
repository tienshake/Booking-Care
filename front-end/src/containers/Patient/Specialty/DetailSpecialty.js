import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './DetailSpecialty.scss';
import HomeHeader from '../../HomePage/HomeHeader';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfo from '../Doctor/DoctorExtraInfo';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import { getAllDetailSpecialty, getAllCodeService } from '../../../services/userService'
import _ from 'lodash';
import { LANGUAGES } from '../../../utils';
class DetailSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataDetailSpecialty: [],
            listProvince: []
        }
    }
    async componentDidMount() {
        this.getAllDetailSpecialty()

    }
    getAllDetailSpecialty = async (location) => {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            const id = this.props.match.params.id
            const res = await getAllDetailSpecialty({ id: id, location: location ? location : 'ALL' })
            const resProvince = await getAllCodeService('PROVINCE')
            if (resProvince && resProvince.errCode === 0) {
                this.setState({ listProvince: resProvince.data });
            }
            if (res && res.errCode === 0) {
                this.setState({ dataDetailSpecialty: res.data });
            }
        }
    }
    handleOnChangeSelect = async (e) => {
        this.getAllDetailSpecialty(e.target.value)
    };
    render() {
        const { dataDetailSpecialty, listProvince } = this.state;
        let { language } = this.props
        return (
            <div className="detail-specialty-container">
                <HomeHeader />
                <div className="des-specialty-header">
                    {dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty) &&
                        <div dangerouslySetInnerHTML={{ __html: dataDetailSpecialty.descriptionHTML }}></div>
                    }
                </div>
                <div className="des-specialty__body">
                    <div className="specialty__search">
                        <select onChange={(e) => this.handleOnChangeSelect(e)}>
                            <option value='ALL'>
                                Toàn quốc
                            </option>
                            {listProvince && listProvince.length > 0 &&
                                listProvince.map((item, index) => {
                                    return (
                                        <option value={item.keyMap} key={index}>
                                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                        </option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    {dataDetailSpecialty.doctorSpecialty && dataDetailSpecialty.doctorSpecialty.length > 0 &&
                        dataDetailSpecialty.doctorSpecialty.map((item, index) => (
                            <div className="each-doctor" key={index}>
                                <div className="each-doctor-content-left">
                                    <div className="doctor-profile">
                                        <ProfileDoctor
                                            doctorId={item.doctorId}
                                            isShowDescriptionDoctor={true}
                                        //   dataTimeModalSchedule={dataTimeModalSchedule}
                                        />
                                    </div>
                                </div>
                                <div className="each-doctor-content-right">
                                    <div className="doctor-schedule">
                                        <DoctorSchedule
                                            idDoctor={item.doctorId}
                                        />
                                    </div>
                                    <div className="doctor-extraInfo">
                                        <DoctorExtraInfo
                                            idDoctor={item.doctorId}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);

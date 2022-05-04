import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorSchedule.scss';
import moment from 'moment';
import localization from 'moment/locale/vi';
import { LANGUAGES } from '../../../utils';
import { getScheduleDoctorByDate } from '../../../services/userService';
import _ from 'lodash';
import { FormattedMessage } from 'react-intl';
import BookingModal from './Modal/BookingModal';
class DoctorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDay: [],
            allAvailableTime: [],
            isOpenModalBooking: false,
            dataTimeModalSchedule: {}

        }
    }
    componentDidMount() {
        const { language, idDoctor } = this.props;
        this.formatLanguageSetAllDate(language)
        if (idDoctor) {
            const value = moment(new Date()).startOf('day').valueOf();
            this.handleGetScheduleByDate(idDoctor, value)

        }
    }
    componentDidUpdate(prevProps, prevState) {
        const { language } = this.props;
        if (prevProps.language !== language) {
            this.formatLanguageSetAllDate(language)
        }

    }
    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    formatLanguageSetAllDate = async (language) => {
        let arrDate = []
        for (let i = 0; i < 7; i++) {
            const object = {};
            if (language === LANGUAGES.VI) {
                const labelVi = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
                object.label = this.capitalizeFirstLetter(labelVi);
                if (i === 0) {
                    let arrString = object.label.split(" - ");
                    object.label = `Hôm nay - ${arrString[1]}`;
                }
            } else {
                object.label = moment(new Date()).add(i, 'days').locale('en').format('dddd - DD/MM');
                if (i === 0) {
                    let arrString = object.label.split(" - ");
                    object.label = `Today - ${arrString[1]}`;
                }
            }
            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
            arrDate.push(object);
        }
        this.setState({ allDay: arrDate });
    };
    handleOnChangeSelectDay = async (e) => {
        const id = this.props.idDoctor
        if (id) {
            this.handleGetScheduleByDate(id, e.target.value)
        }
    };
    handleGetScheduleByDate = async (id, value) => {
        const date = value
        const res = await getScheduleDoctorByDate(id, date);
        if (res && res.errCode === 0) {
            this.setState({ allAvailableTime: res.data, isLoading: false });
        }

    };
    handleClickScheduleTime = (time) => {
        this.setState({ isOpenModalBooking: true, dataTimeModalSchedule: time });
    };
    handleCloseModalBooking = () => {
        this.setState({ isOpenModalBooking: false });

    }
    render() {
        const {
            allDay,
            allAvailableTime,
            isOpenModalBooking,
            dataTimeModalSchedule
        } = this.state;
        const { language } = this.props;

        return (
            <>
                <div className="doctor-schedule">
                    <div className="doctor-schedule__header">
                        <select
                            onChange={(e) => this.handleOnChangeSelectDay(e)}
                        >
                            {allDay
                                &&
                                allDay.length > 0
                                && allDay.map((day, index) => (
                                    <option
                                        value={day.value}
                                        key={index}
                                    >
                                        {day.label}
                                    </option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="doctor-schedule__content">
                        <div className="doctor-schedule__calendar">
                            <i className="fas fa-calendar-alt"></i><span>
                                <FormattedMessage id="patient.detail-doctor.schedule" />
                            </span>
                        </div>
                        <div className="doctor-schedule__time">
                            {
                                allAvailableTime
                                    && allAvailableTime.length > 0
                                    ? <>
                                        <div className="doctor-schedule__time-btns">
                                            {
                                                allAvailableTime.map(((item, index) => {
                                                    const timeDisplay = language === LANGUAGES.VI ?
                                                        item.timeTypeData.valueVi : item.timeTypeData.valueEn
                                                    return (
                                                        <button
                                                            key={index}
                                                            onClick={() => this.handleClickScheduleTime(item)}
                                                            className={
                                                                language === LANGUAGES.VI ? "choose-day btn-color btn-vi"
                                                                    : "choose-day btn-color btn-en"
                                                            }
                                                        >{timeDisplay}</button>
                                                    )
                                                }))
                                            }
                                        </div>
                                        <div className="book-free">
                                            <span>
                                                <FormattedMessage id="patient.detail-doctor.choose" />
                                                <i className="far fa-hand-point-up"></i>
                                                <FormattedMessage id="patient.detail-doctor.book-free" />
                                            </span>
                                        </div>
                                    </>
                                    :
                                    <div className="no-calendar">
                                        <FormattedMessage id="patient.detail-doctor.no-schedule" />
                                    </div>
                            }
                        </div>
                    </div>

                </div>
                <BookingModal
                    isOpenModalBooking={isOpenModalBooking}
                    handleCloseModalBooking={this.handleCloseModalBooking}
                    dataTimeModalSchedule={dataTimeModalSchedule}
                />
            </>

        );
    }
}
const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);

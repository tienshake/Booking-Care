import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageSchedule.scss';
import { FormattedMessage } from 'react-intl';
import 'react-markdown-editor-lite/lib/index.css';
import * as actions from '../../../store/actions';
import Select from 'react-select';
import { LANGUAGES, CRUD_ACTION, dateFormat } from '../../../utils';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import FormattedDate from '../../../components/Formating/FormattedDate'
import { range } from 'lodash';
import { toast } from 'react-toastify';
import _ from 'lodash';
import { saveBulkCreateScheduleDoctor } from '../../../services/userService';
class ManageSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctor: [],
            selectedDoctor: {},
            currentDate: "",
            rangeTime: []
        }
    }
    componentDidMount() {
        this.props.fetchAllDoctorRedux()
        this.props.fetchTimeAllScheduleDoctorRedux()
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.doctors !== this.props.doctors) {
            const dataSelect = this.buildDataInputSelect(this.props.doctors)
            this.setState({
                arrDoctor: dataSelect,
            })
        }
        if (prevProps.language !== this.props.language) {
            const dataSelect = this.buildDataInputSelect(this.props.doctors)
            this.setState({
                arrDoctor: dataSelect,
            })
        }
        if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
            let data = this.props.allScheduleTime
            if (data && data.length > 0) {
                data = data.map(item => ({ ...item, isSelected: false }))
            }
            this.setState({
                rangeTime: data,
            })
        }

    }
    buildDataInputSelect = data => {
        let result = [];
        let { language } = this.props
        if (data && data.length > 0) {
            data.map((item, index) => {
                let oject = {};
                const nameVi = `${item.firstName} ${item.lastName}`;
                const nameEn = `${item.lastName} ${item.firstName}`;
                oject.label = language === LANGUAGES.VI ? nameVi : nameEn;
                oject.value = item.id
                result.push(oject);
            })
        }
        return result;
    }
    handleChangeSelected = async (selectedDoctor) => {
        this.setState({ selectedDoctor });
    };
    handleOnchangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        })
    }
    handleClickBtnTime = (time) => {
        const { rangeTime } = this.state
        if (rangeTime && rangeTime.length) {
            let rangeTimeCopy = rangeTime
            const index = rangeTime.findIndex(item => item === time)
            rangeTimeCopy[index].isSelected = !rangeTimeCopy[index].isSelected
            this.setState({
                rangeTime: rangeTimeCopy
            })

        }
    }
    handleSaveSchedule = async () => {
        const { rangeTime, selectedDoctor, currentDate } = this.state
        let result = []
        if (!currentDate) {
            toast.error("Invalid date!")
            return;
        }
        if (selectedDoctor && _.isEmpty(selectedDoctor)) {
            toast.error("Invalid selectedDoctor!")
            return;
        }
        const formattedDate = new Date(currentDate).getTime()
        if (rangeTime && rangeTime.length > 0) {
            const data = rangeTime.filter(item => item.isSelected === true)
            if (data && data.length > 0) {
                data.forEach(item => {
                    let object = {};
                    object.doctorId = selectedDoctor.value
                    object.date = formattedDate
                    object.timeType = item.keyMap
                    result.push(object);
                })
            } else {
                toast.error("Invalid select time!")
            }
        }
        const res = await saveBulkCreateScheduleDoctor({
            arrSchedule: result,
            doctorId: selectedDoctor.value,
            date: formattedDate
        })
        console.log(res)
        if (res && res.errCode === 0) {
            toast.success("Tạo thành công lịch hẹn!");
        } else {
            toast.error("Tạo lịch hẹn thất bại!");
            console.log('res :>> ', res);
        }
    }
    render() {
        const { rangeTime } = this.state
        const { language } = this.props
        let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
        return (
            <>
                <div className="manage-schedule__container">
                    <div className="manage-schedule__title">
                        <FormattedMessage id="manage-schedule.title" />
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-6 form-group">
                                <label>  <FormattedMessage id="manage-schedule.choose-doctor" /></label>
                                <div className="manage-doctor__content-left form-group">
                                    <Select
                                        value={this.state.selectedDoctor}
                                        onChange={this.handleChangeSelected}
                                        options={this.state.arrDoctor}
                                    />
                                </div>
                            </div>
                            <div className="col-6 form-group">
                                <label><FormattedMessage id="manage-schedule.choose-date" /></label>
                                <DatePicker
                                    onChange={this.handleOnchangeDatePicker}
                                    className="form-control"
                                    selected={this.state.currentDate}
                                    minDate={yesterday}
                                />
                            </div>
                            <div className="col-12 pick-hour__container">
                                {rangeTime && rangeTime.length &&
                                    rangeTime.map((item, index) => (
                                        <button
                                            key={index}
                                            className={item.isSelected ? "btn btn-warning btn-schedule" : "btn btn-schedule"}
                                            onClick={() => this.handleClickBtnTime(item)}
                                        >
                                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                        </button>
                                    ))
                                }
                            </div>

                            <div className="col-12 ">
                                <button
                                    className="btn btn-primary"
                                    onClick={() => this.handleSaveSchedule()}
                                ><FormattedMessage id="manage-schedule.save" /></button>

                            </div>
                        </div>
                    </div>
                </div>

            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        doctors: state.admin.allDoctor,
        allScheduleTime: state.admin.allScheduleTime,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctorRedux: () => dispatch(actions.fetchAllDoctor()),
        fetchTimeAllScheduleDoctorRedux: () => dispatch(actions.fetchTimeAllScheduleDoctor()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);

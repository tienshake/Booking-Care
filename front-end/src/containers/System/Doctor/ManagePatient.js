import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './ManagePatient.scss';
import DatePicker from '../../../components/Input/DatePicker';
class ManagePatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: new Date()
        }
    }
    handleOnchangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        })
    }
    render() {
        let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
        return (
            <div className="manage-patient-container">
                <div className="m-p-title">
                    Quản lý bệnh nhân khám bệnh
                </div>
                <div className="manage-patient-body row">
                    <div className="col-4 form-group">
                        <label>Chọn ngày khám</label>
                        <DatePicker
                            onChange={this.handleOnchangeDatePicker}
                            className="form-control"
                            value={this.state.currentDate}
                        />
                    </div>
                    <div className="col-12">
                        <table className="manage-patient-table">
                            <tr>
                                <th>Company</th>
                                <th>Contact</th>
                                <th>Country</th>
                            </tr>
                            <tr>
                                <td>Alfreds Futterkiste</td>
                                <td>Maria Anders</td>
                                <td>Germany</td>
                            </tr>

                        </table>
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';
import { postVerifyBookingAppointment } from '../../services/userService';
import HomeHeader from '../HomePage/HomeHeader';
import './VerifyEmail.scss';
class VerifyEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statusVerified: false,
            isLoading: true
        }
    }
    async componentDidMount() {
        if (this.props.location && this.props.location.search) {
            const url = new URLSearchParams(this.props.location.search);
            const token = url.get('token');
            const doctorId = url.get('doctorId');
            try {
                const res = await postVerifyBookingAppointment({ token, doctorId });
                if (res && res.errCode === 0) {
                    this.setState({ statusVerified: true, isLoading: false });
                } else {
                    this.setState({ isLoading: false });
                }
            } catch (e) {
                console.log("Error from server");
            }


        }

    }
    render() {
        const { statusVerified, isLoading } = this.state;
        console.log(this.state);
        return (
            <>
                <HomeHeader />
                {isLoading ?
                    <div className="status-verify">Loading data...</div>
                    :
                    <div>
                        {
                            statusVerified ?
                                <div className="status-verify">Bạn đã thành công xác nhận lịch hẹn</div>
                                : <div className="status-verify">Lịch hẹn không tồn tại hoặc đã được xác nhận!</div>
                        }
                    </div>
                }

            </>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(VerifyEmail));

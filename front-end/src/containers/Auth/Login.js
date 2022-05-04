import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";


import './Login.scss';
import { FormattedMessage } from 'react-intl';
import { handleLoginApi } from "../../services/userService"

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isShowHiddenPassword: true,
            errorMessage: ''
        }
    }
    handleOnchangeUser = (e) => {
        this.setState({
            username: e.target.value
        })
    }
    handleOnchangePassword = (e) => {
        this.setState({
            password: e.target.value
        })
    }
    handleGetUser = async () => {
        this.setState({
            errorMessage: ''
        })

        try {
            const data = await handleLoginApi(this.state.username, this.state.password);
            if (data && data.errCode !== 0) {
                this.setState({
                    errorMessage: data.errMessage
                })
            }
            if (data && data.errCode === 0) {
                this.props.userLoginSuccess(data.user)
                console.log('login success');
            }
        } catch (e) {
            if (e.response) {
                if (e.response.data) {
                    this.setState({
                        errorMessage: e.response.data.message
                    })
                }
            }

        }
    }
    handleShowHiddenPassword = () => {
        this.setState({
            isShowHiddenPassword: !this.state.isShowHiddenPassword
        })
    }
    handleOnKeyDown = (event) => {
        console.log("alloooo")
        if (event.key === "Enter" || event.keyCode === 13) {
            console.log("alo")
            this.handleGetUser()
        }
    }
    render() {

        return (
            <div className="login-background">
                <div className="login-container">
                    <div className="login-content row">
                        <div className="col-12 text-login">Login</div>
                        <div className="col-12 form-group login-input">
                            <label>Username:</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter your username"
                                value={this.state.username}
                                onChange={(e) => this.handleOnchangeUser(e)}
                            />
                        </div>
                        <div className="col-12 form-group login-input">
                            <label>Password:</label>
                            <div className="custom-input-password hidden-password">
                                <input
                                    type={this.state.isShowHiddenPassword ? "password" : "text"}
                                    className="form-control"
                                    placeholder="Enter your password"
                                    value={this.state.password}
                                    onChange={(e) => this.handleOnchangePassword(e)}
                                />
                                <span
                                    onClick={() => this.handleShowHiddenPassword()}
                                >

                                    <i className={this.state.isShowHiddenPassword
                                        ? "far fa-eye login-eye"
                                        :
                                        "far fa-eye-slash login-eye"}
                                    ></i>

                                </span>

                            </div>

                        </div>
                        <div className="col-12 " style={{ color: 'red' }}>
                            {this.state.errorMessage}
                        </div>
                        <div className="col-12 ">
                            <button
                                className="login-btn"
                                onClick={() => this.handleGetUser()}
                                onKeyDown={(event) => this.handleOnKeyDown(event)}
                            >
                                Login
                            </button>
                        </div>
                        <div className="col-12 mt-3">
                            <span className="forgot-password">Forgot Password?</span>

                        </div>
                        <div className="col-12 text-center mt-3" >
                            <span className="login__text-or">Or login with:</span>
                        </div>
                        <div className="col-12 login-social" >
                            <i className="fab fa-google-plus-g google"></i>
                            <i className="fab fa-facebook-f facebook"></i>
                        </div>
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
        navigate: (path) => dispatch(push(path)),
        // userLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

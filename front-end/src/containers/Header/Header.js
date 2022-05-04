import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu, doctor } from './menuApp';
import './Header.scss';
import { LANGUAGES, USER_ROLE } from '../../utils';
import _ from 'lodash';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuApp: []
        }
    }
    handleChangeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)
    }
    componentDidMount() {
        const { userInfo } = this.props
        let menu = []
        if (userInfo && !_.isEmpty(userInfo)) {
            const role = userInfo.roleId;

            if (role === USER_ROLE.ADMIN) {
                menu = adminMenu
            }
            if (role === USER_ROLE.DOCTOR) {
                menu = doctor
            }
            this.setState({
                menuApp: menu,
            })
        }
    }
    render() {
        const { menuApp } = this.state
        const { processLogout } = this.props;
        const { userInfo } = this.props
        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={menuApp} />
                </div>
                <div className="header__wrap-logout">
                    <span className="welcome">
                        <FormattedMessage
                            id="homeHeader.welcome" />
                        {
                            userInfo
                                && userInfo.firstName
                                && userInfo.lastName
                                ? userInfo.firstName + userInfo.lastName
                                : ''
                        }!
                    </span>
                    <div>
                        <span
                            className={this.props.language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'}
                            onClick={() => this.handleChangeLanguage(LANGUAGES.VI)}
                        >VN</span>
                        <span
                            className={this.props.language === LANGUAGES.EN ? 'language-en active' : 'language-en'}
                            onClick={() => this.handleChangeLanguage(LANGUAGES.EN)}
                        >EN</span>
                    </div>
                    {/* nút logout */}
                    <div className="btn btn-logout" onClick={processLogout} title="Log out">
                        <i className="fas fa-sign-out-alt"></i>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);

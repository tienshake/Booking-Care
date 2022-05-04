import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../utils/constant';
import { changeLanguageApp } from '../../store/actions/appActions';
import { withRouter } from 'react-router';

class HomeHeader extends Component {

    handleChangeLanguage = (language, selected) => {
        this.props.changeLanguageAppRedux(language)
    }
    handleReturnToHome = () => {
        this.props.history.push(`/home`)
    }
    render() {
        let language = this.props.language
        return (
            <>
                <div className="header__container">
                    <div className="header__content">
                        <div className="left__content">
                            <i className="fas fa-bars header__icon"></i>
                            <div className="header__logo" onClick={() => this.handleReturnToHome()}>
                            </div>
                        </div>
                        <div className="center__content">
                            <div className="center__content-child">
                                <div className=""><b><FormattedMessage id="homeHeader.specialty" /></b></div>
                                <div className="child__subtitle"><FormattedMessage id="homeHeader.searchDoctor" /></div>
                            </div>
                            <div className="center__content-child">
                                <div className=""><b><FormattedMessage id="homeHeader.health-facilities" /></b></div>
                                <div className="child__subtitle"><FormattedMessage id="homeHeader.Choose-hospital-clinic" /></div>
                            </div>
                            <div className="center__content-child">
                                <div className=""><b><FormattedMessage id="homeHeader.doctor" /></b></div>
                                <div className="child__subtitle"><FormattedMessage id="homeHeader.good-doctor" /> </div>
                            </div>
                            <div className="center__content-child">
                                <div className=""><b><FormattedMessage id="homeHeader.Examination-package" /></b></div>
                                <div className="child__subtitle"><FormattedMessage id="homeHeader.General-examination" /></div>
                            </div>
                        </div>
                        <div className="right__content">
                            <div className="right__content-support">
                                <i className="fas fa-question-circle"></i>
                                <h4><FormattedMessage id="homeHeader.support" /></h4>
                            </div>
                            <div className="right__content-flag">

                                <h6 className={language === LANGUAGES.VI ? 'language__vn active' : 'language__vn'}>
                                    <span
                                        onClick={() => this.handleChangeLanguage(LANGUAGES.VI)}
                                    >VN</span>
                                </h6>
                                <span>/</span>
                                <h6 className={language === LANGUAGES.EN ? 'language__en active' : 'language__en'}>
                                    <span
                                        onClick={() => this.handleChangeLanguage(LANGUAGES.EN)}
                                    >EN</span>
                                </h6>
                            </div>
                        </div>
                    </div>

                </div>
                {
                    this.props.isShowBanner &&
                    <div className="home__banner-container">
                        <div className="home__banner">
                            <div className="banner1">
                                <div className="home__banner-title1"><h1><FormattedMessage id="banner.title1" /></h1></div>
                                <div className="home__banner-title2"><p><FormattedMessage id="banner.title2" /></p></div>
                                <div className="home__banner-search">
                                    <div className="search__input">
                                        <i className="fas fa-search"></i>
                                        <input placeholder="Tìm chuyên khoa" />
                                    </div>
                                </div>
                            </div>
                            <div className="banner2">
                                <div className="home__banner-options">
                                    <ul className="options__list">
                                        <li className="options__item">
                                            <div className="options__img"
                                                style={{
                                                    backgroundImage: "url(" + "https://cdn.bookingcare.vn/fo/2021/12/08/133537-khamchuyenkhoa.png" + ")",
                                                    backgroundPosition: 'center',
                                                    backgroundSize: 'cover',
                                                    backgroundRepeat: 'no-repeat',
                                                    backgroundSize: '32px'
                                                }}
                                            ></div>
                                            <p><FormattedMessage id="banner.Examination" /> <br /> <FormattedMessage id="banner.Specialty" /></p>

                                        </li>
                                        <li className="options__item">
                                            <div className="options__img"
                                                style={{
                                                    backgroundImage: "url(" + "	https://cdn.bookingcare.vn/fo/2021/12/08/133657-khamtuxa.png" + ")",
                                                    backgroundPosition: 'center',
                                                    backgroundSize: 'cover',
                                                    backgroundRepeat: 'no-repeat',
                                                    backgroundSize: '32px'
                                                }}
                                            ></div>
                                            <p><FormattedMessage id="banner.Examination" />  <br /> <FormattedMessage id="banner.far-away" /></p>

                                        </li>
                                        <li className="options__item">
                                            <div className="options__img"
                                                style={{
                                                    backgroundImage: "url(" + "https://cdn.bookingcare.vn/fo/2021/12/08/133744-khamtongquat.png" + ")",
                                                    backgroundPosition: 'center',
                                                    backgroundSize: 'cover',
                                                    backgroundRepeat: 'no-repeat',
                                                    backgroundSize: '32px'
                                                }}
                                            ></div>
                                            <p><FormattedMessage id="banner.Examination" />  <br /> <FormattedMessage id="banner.generality" /></p>

                                        </li>
                                        <li className="options__item">
                                            <div className="options__img"
                                                style={{
                                                    backgroundImage: "url(" + "https://cdn.bookingcare.vn/fo/2021/12/08/133744-dichvuxetnghiem.png" + ")",
                                                    backgroundPosition: 'center',
                                                    backgroundSize: 'cover',
                                                    backgroundRepeat: 'no-repeat',
                                                    backgroundSize: '32px'
                                                }}
                                            ></div>
                                            <p><FormattedMessage id="banner.test" /> <br /> <FormattedMessage id="banner.Medicine" /></p>

                                        </li>
                                        <li className="options__item">
                                            <div className="options__img"
                                                style={{
                                                    backgroundImage: "url(" + "https://cdn.bookingcare.vn/fo/2021/12/08/133744-suckhoetinhthan.png" + ")",
                                                    backgroundPosition: 'center',
                                                    backgroundSize: 'cover',
                                                    backgroundRepeat: 'no-repeat',
                                                    backgroundSize: '32px'
                                                }}
                                            ></div>
                                            <p><FormattedMessage id="banner.health" />  <br /> <FormattedMessage id="banner.Morale" /></p>

                                        </li>
                                        <li className="options__item">
                                            <div className="options__img"
                                                style={{
                                                    backgroundImage: "url(" + "https://cdn.bookingcare.vn/fo/2021/12/08/133537-khamchuyenkhoa.png" + ")",
                                                    backgroundPosition: 'center',
                                                    backgroundSize: 'cover',
                                                    backgroundRepeat: 'no-repeat',
                                                    backgroundSize: '32px'
                                                }}
                                            ></div>
                                            <p><FormattedMessage id="banner.Examination" />  <br /> <FormattedMessage id="banner.dentistry" /></p>

                                        </li>
                                    </ul>

                                </div>
                            </div>

                        </div>


                    </div>
                }


            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));

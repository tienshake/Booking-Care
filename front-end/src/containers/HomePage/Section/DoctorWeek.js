

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils/constant';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';

class DoctorWeek extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrDoctor: [],
        }
    }

    componentDidMount() {
        this.props.loadTopDoctor()
    }
    componentDidUpdate(prevProps, prevState, nextProps) {
        if (prevProps.topDoctor !== this.props.topDoctor) {
            this.setState({
                arrDoctor: this.props.topDoctor
            })
        }
    }
    handleViewDetailDoctor = (doctor) => {
        this.props.history.push(`/detail-doctor/${doctor.id}`)
    }
    render() {
        const arrDoctor = this.state.arrDoctor
        const language = this.props.language
        let settings = this.props.settings

        return (
            <>

                <div className="section__container section__container-DoctorWeek">
                    <div className="container">
                        <div className="section__header">
                            <h2><FormattedMessage id="home-page.out-standing-doctor" /></h2>
                            <button className="section__header-btn"><FormattedMessage id="home-page.more-info" /></button>
                        </div>
                        <Slider {...settings}>

                            {
                                arrDoctor && arrDoctor.length > 0 &&
                                arrDoctor.map((doctor, index) => {
                                    let imageBase64 = ''
                                    if (doctor.image) {
                                        imageBase64 = new Buffer(doctor.image, 'base64').toString('binary');
                                    }
                                    const nameVi = `${doctor.positionData.valueVi}, ${doctor.firstName}  ${doctor.lastName}`;
                                    const nameEn = `${doctor.positionData.valueEn}, ${doctor.lastName} ${doctor.firstName}  `;
                                    return (
                                        <div className="section__item" key={index}
                                            onClick={() => this.handleViewDetailDoctor(doctor)}
                                        >
                                            <div className="section__item-img" >
                                                <img className="section__img" src={imageBase64} />
                                                <div className="section__item-des">
                                                    <h3 className="section__title">{language === LANGUAGES.VI ? nameVi : nameEn}</h3>
                                                    <p>Da liễu</p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                                )
                            }
                        </Slider>
                    </div>

                </div>

            </>

        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        topDoctor: state.admin.topDoctor,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopDoctor: () => dispatch(actions.fetchTopDocs())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DoctorWeek));


import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";
import './MedicalFacility.scss';


class MedicalFacility extends Component {


    render() {
        let settings = this.props.settings
        return (
            <>

                <div className="section__container section__container-MedicalFacility">
                    <div className="container">
                        <div className="section__header">
                            <h2>Cơ sở y tế nổi bật</h2>
                            <button className="section__header-btn">XEM THÊM</button>
                        </div>
                        <Slider {...settings}>
                            <div className="section__item">
                                <img className="section__img" src="https://cdn.bookingcare.vn/fr/w500/2020/06/03/114348-bv-viet-duc.jpg" />
                                <h3 className="section__title">Bệnh viện Hữu nghị Việt Đức</h3>
                            </div>
                            <div className="section__item">
                                <img className="section__img" src="https://cdn.bookingcare.vn/fr/w500/2020/06/03/114348-bv-viet-duc.jpg" />
                                <h3 className="section__title">Bệnh viện Hữu nghị Việt Đức</h3>
                            </div>
                            <div className="section__item">
                                <img className="section__img" src="https://cdn.bookingcare.vn/fr/w500/2020/06/03/114348-bv-viet-duc.jpg" />
                                <h3 className="section__title">Bệnh viện Hữu nghị Việt Đức</h3>
                            </div>
                            <div className="section__item">
                                <img className="section__img" src="https://cdn.bookingcare.vn/fr/w500/2020/06/03/114348-bv-viet-duc.jpg" />
                                <h3 className="section__title">Bệnh viện Hữu nghị Việt Đức</h3>
                            </div>
                            <div className="section__item">
                                <img className="section__img" src="https://cdn.bookingcare.vn/fr/w500/2020/06/03/114348-bv-viet-duc.jpg" />
                                <h3 className="section__title">Bệnh viện Hữu nghị Việt Đức</h3>
                            </div>
                            <div className="section__item">
                                <img className="section__img" src="https://cdn.bookingcare.vn/fr/w500/2020/06/03/114348-bv-viet-duc.jpg" />
                                <h3 className="section__title">Bệnh viện Hữu nghị Việt Đức</h3>
                            </div>
                            <div className="section__item">
                                <img className="section__img" src="https://cdn.bookingcare.vn/fr/w500/2020/06/03/114348-bv-viet-duc.jpg" />
                                <h3 className="section__title">Bệnh viện Hữu nghị Việt Đức</h3>
                            </div>
                            <div className="section__item">
                                <img className="section__img" src="https://cdn.bookingcare.vn/fr/w500/2020/06/03/114348-bv-viet-duc.jpg" />
                                <h3 className="section__title">Bệnh viện Hữu nghị Việt Đức</h3>
                            </div>
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);

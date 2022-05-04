

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";


class HandBook extends Component {


    render() {
        let settings = this.props.settings
        return (
            <>

                <div className="section__container section__container-HandBook">
                    <div className="container">
                        <div className="section__header">
                            <h2>Cẩm nang</h2>
                            <button className="section__header-btn">XEM THÊM</button>
                        </div>
                        <Slider {...settings}>
                            <div className="section__item">
                                <div className="section__item-img" >
                                    <img className="section__img" src="https://cdn.bongdaplus.vn/Assets/Media/2020/07/06/66/llia.jpg" />
                                    <div className="section__item-des">
                                        <h3 className="section__title">Phó Giáo sư, Tiến sĩ, Bác sĩ cao cấp Nguyễn Duy Hưng</h3>
                                        <p>Da liễu</p>
                                    </div>
                                </div>
                            </div>
                            <div className="section__item">
                                <div className="section__item-img" >
                                    <img className="section__img" src="https://cdn.bongdaplus.vn/Assets/Media/2020/07/06/66/llia.jpg" />
                                    <div className="section__item-des">
                                        <h3 className="section__title">Phó Giáo sư, Tiến sĩ, Bác sĩ cao cấp Nguyễn Duy Hưng</h3>
                                        <p>Da liễu</p>
                                    </div>
                                </div>
                            </div>
                            <div className="section__item">
                                <div className="section__item-img" >
                                    <img className="section__img" src="https://cdn.bongdaplus.vn/Assets/Media/2020/07/06/66/llia.jpg" />
                                    <div className="section__item-des">
                                        <h3 className="section__title">Phó Giáo sư, Tiến sĩ, Bác sĩ cao cấp Nguyễn Duy Hưng</h3>
                                        <p>Da liễu</p>
                                    </div>
                                </div>
                            </div>
                            <div className="section__item">
                                <div className="section__item-img" >
                                    <img className="section__img" src="https://cdn.bongdaplus.vn/Assets/Media/2020/07/06/66/llia.jpg" />
                                    <div className="section__item-des">
                                        <h3 className="section__title">Phó Giáo sư, Tiến sĩ, Bác sĩ cao cấp Nguyễn Duy Hưng</h3>
                                        <p>Da liễu</p>
                                    </div>
                                </div>
                            </div>
                            <div className="section__item">
                                <div className="section__item-img" >
                                    <img className="section__img" src="https://cdn.bongdaplus.vn/Assets/Media/2020/07/06/66/llia.jpg" />
                                    <div className="section__item-des">
                                        <h3 className="section__title">Phó Giáo sư, Tiến sĩ, Bác sĩ cao cấp Nguyễn Duy Hưng</h3>
                                        <p>Da liễu</p>
                                    </div>
                                </div>
                            </div>
                            <div className="section__item">
                                <div className="section__item-img" >
                                    <img className="section__img" src="https://cdn.bongdaplus.vn/Assets/Media/2020/07/06/66/llia.jpg" />
                                    <div className="section__item-des">
                                        <h3 className="section__title">Phó Giáo sư, Tiến sĩ, Bác sĩ cao cấp Nguyễn Duy Hưng</h3>
                                        <p>Da liễu</p>
                                    </div>
                                </div>
                            </div>
                            <div className="section__item">
                                <div className="section__item-img" >
                                    <img className="section__img" src="https://cdn.bongdaplus.vn/Assets/Media/2020/07/06/66/llia.jpg" />
                                    <div className="section__item-des">
                                        <h3 className="section__title">Phó Giáo sư, Tiến sĩ, Bác sĩ cao cấp Nguyễn Duy Hưng</h3>
                                        <p>Da liễu</p>
                                    </div>
                                </div>
                            </div>
                            <div className="section__item">
                                <div className="section__item-img" >
                                    <img className="section__img" src="https://cdn.bongdaplus.vn/Assets/Media/2020/07/06/66/llia.jpg" />
                                    <div className="section__item-des">
                                        <h3 className="section__title">Phó Giáo sư, Tiến sĩ, Bác sĩ cao cấp Nguyễn Duy Hưng</h3>
                                        <p>Da liễu</p>
                                    </div>
                                </div>
                            </div>
                            <div className="section__item">
                                <div className="section__item-img" >
                                    <img className="section__img" src="https://cdn.bongdaplus.vn/Assets/Media/2020/07/06/66/llia.jpg" />
                                    <div className="section__item-des">
                                        <h3 className="section__title">Phó Giáo sư, Tiến sĩ, Bác sĩ cao cấp Nguyễn Duy Hưng</h3>
                                        <p>Da liễu</p>
                                    </div>
                                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);

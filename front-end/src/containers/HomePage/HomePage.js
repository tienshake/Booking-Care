import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import './HomeHeader.scss';
import './HomePage.scss';
import Specialty from './Section/Specialty';
import MedicalFacility from './Section/MedicalFacility';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import DoctorWeek from './Section/DoctorWeek';
import HandBook from './Section/HandBook';
import HomeFooter from './HomeFooter';
class HomePage extends Component {

    componentDidMount() {
    }
    componentDidUpdate() {
    }

    render() {
        let settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,

        };
        return (
            <div>
                <HomeHeader isShowBanner={true} />
                <Specialty
                    settings={settings}
                />
                <MedicalFacility
                    settings={settings}
                />
                <DoctorWeek
                    settings={settings}
                />
                <HandBook
                    settings={settings}
                />
                <HomeFooter />
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

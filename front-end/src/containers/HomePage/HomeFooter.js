
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";


class HomeFooter extends Component {


    render() {

        return (
            <>

                <div className="home__footer">
                    <footer>&copy; Copyright 2021 Trần Việt Tiến</footer>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);

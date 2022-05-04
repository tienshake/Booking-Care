import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";
import './Specialty.scss';
import { getAllSpecialty } from '../../../services/userService';
import { withRouter } from 'react-router';
class Specialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSpecially: []
        }
    }
    async componentDidMount() {
        const res = await getAllSpecialty();
        if (res && res.errCode === 0) {
            this.setState({ dataSpecially: res.data });
        }
    }
    handleViewDetailSpecialty = (data) => {
        console.log(data);
        if (this.props.history) {
            this.props.history.push(`/detail-specialty/${data.id}`)

        }
    };
    render() {
        let settings = this.props.settings;
        const { dataSpecially } = this.state;
        return (
            <>

                <div className="section__container section__container-Specialty">
                    <div className="container">
                        <div className="section__header">
                            <h2>Chuyên khoa phổ biến</h2>
                            <button className="section__header-btn">XEM THÊM</button>
                        </div>
                        <Slider {...settings}>
                            {dataSpecially && dataSpecially.length > 0 ?
                                dataSpecially.map((item, index) => {
                                    return <div className="section__item" key={index}
                                        onClick={() => this.handleViewDetailSpecialty(item)}
                                    >
                                        <img className="section__img" src={item.image} />
                                        <h3 className="section__title">{item.name}</h3>
                                    </div>
                                }) : ''
                            }


                        </Slider>
                    </div>
                </div>

                {/* <div style={{ height: '500px' }}>

                </div> */}
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));

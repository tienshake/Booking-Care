import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import "./DetailDoctor.scss";
import * as actions from '../../../store/actions';
import { MarkdownIt } from 'markdown-it';
import { LANGUAGES } from '../../../utils/constant';
import DoctorSchedule from './DoctorSchedule';
import DoctorExtraInfo from './DoctorExtraInfo';
class DetailDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailDoctor: {}
        }
    }
    componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            this.props.getDoctorByIdRedux(this.props.match.params.id)
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.detailDoctorRedux !== this.props.detailDoctorRedux) {
            this.setState({
                detailDoctor: this.props.detailDoctorRedux
            })
        }
    }
    render() {
        const detailDoctor = this.state.detailDoctor
        const language = this.props.language
        let nameVi = "";
        let nameEn = "";
        if (detailDoctor && detailDoctor.positionData) {
            nameVi = `${detailDoctor.positionData.valueVi}, ${detailDoctor.firstName}  ${detailDoctor.lastName}`;
            nameEn = `${detailDoctor.positionData.valueEn}, ${detailDoctor.lastName} ${detailDoctor.firstName}`;
        }
        return (
            <>
                <HomeHeader
                    isShowBanner={false}
                />
                <div className="doctor-detail__container">
                    <div className="intro-doctor">
                        <div className="content-left"  >
                            <div
                                className="doctor-detail__img"
                                style={{ backgroundImage: `url(${detailDoctor && detailDoctor.image ? detailDoctor.image : ''})` }}
                            >

                            </div>
                        </div>
                        <div className="content-right">
                            <div className="content-right__wrap">
                                <div className="content-right__up">
                                    {language === LANGUAGES.VI ? nameVi : nameEn}

                                </div>
                                <div className="content-right__down">
                                    {
                                        detailDoctor
                                        && detailDoctor.Markdown
                                        && detailDoctor.Markdown.description
                                        && <span>{detailDoctor.Markdown.description}</span>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="schedule-doctor">
                        <div className="content-left" >
                            <DoctorSchedule
                                idDoctor={this.props.match.params.id}
                            />
                        </div>
                        <div className="content-right" >
                            <DoctorExtraInfo
                                idDoctor={this.props.match.params.id}
                            />
                        </div>
                    </div>
                    <div className="detail-info-doctor">
                        {
                            detailDoctor
                            && detailDoctor.Markdown
                            && detailDoctor.Markdown.contentHTML
                            && <div dangerouslySetInnerHTML={{ __html: detailDoctor.Markdown.contentHTML }}></div>
                        }
                    </div>
                    <div className="comment-doctor">

                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        detailDoctorRedux: state.admin.detailDoctorById,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getDoctorByIdRedux: (id) => dispatch(actions.fetchDetailDoctorById(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);

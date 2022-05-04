import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllCodeService } from '../../../services/userService';
import { LANGUAGES, CRUD_ACTION } from '../../../utils/constant';
import * as actions from '../../../store/actions';
import './UserRedux.scss';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import TableManageUser from './TableManageUser';
import CommonUtils from '../../../utils/CommonUtils';
class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genders: [],
            positions: [],
            roles: [],
            previewImg: '',
            isOpen: false,

            isUserCreated: false,
            id: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            gender: '',
            position: '',
            role: '',
            avatar: '',
            action: '',
        }
    }
    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {

        if (prevProps.genderRedux !== this.props.genderRedux) {
            const arrGender = this.props.genderRedux
            this.setState({
                genders: arrGender,
                gender: arrGender && arrGender.length > 0 ? arrGender[0].keyMap : ''

            })
        }
        if (prevProps.position !== this.props.position) {
            const arrPosition = this.props.position
            this.setState({
                positions: arrPosition,
                position: arrPosition && arrPosition.length > 0 ? arrPosition[0].keyMap : ''
            })
        }
        if (prevProps.roles !== this.props.roles) {
            const arrRole = this.props.roles
            this.setState({
                roles: arrRole,
                role: arrRole && arrRole.length > 0 ? arrRole[0].keyMap : ''
            })
        }
        if (prevProps.users !== this.props.users) {
            const arrGender = this.props.genderRedux
            const arrPosition = this.props.position
            const arrRole = this.props.roles
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                address: '',
                gender: arrGender && arrGender.length > 0 ? arrGender[0].keyMap : '',
                position: arrPosition && arrPosition.length > 0 ? arrPosition[0].keyMap : '',
                role: arrRole && arrRole.length > 0 ? arrRole[0].keyMap : '',
                avatar: '',
                action: CRUD_ACTION.CREATE,
                previewImg: ''
            })
        }
    }
    handleOnchangeImg = async (e) => {
        const data = e.target.files;
        const file = data[0];
        if (file) {
            const b64 = await CommonUtils.getBase64(file);
            const objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImg: objectUrl,
                avatar: b64
            })

        }
    }
    isOpenPreviewImage = () => {
        if (!this.state.previewImg) {
            return
        };
        this.setState({
            isOpen: true
        })
    }

    onchangeInput = (e, id) => {
        const copyState = { ...this.state }
        copyState[id] = e.target.value
        this.setState({
            ...copyState
        })

    }

    checkValiDateInput = () => {
        let isValid = false;
        const arrCheck = ['email', 'password', 'firstName', 'lastName', 'phoneNumber',
            'address'
        ]
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = true;
                alert('This input is require:' + arrCheck[i])
                break;
            }
        }
        return isValid;
    }

    handleSaveUser = async () => {
        const isValid = this.checkValiDateInput();
        if (isValid) return;
        const { action } = this.state
        if (action === CRUD_ACTION.CREATE) {
            //fire create user
            await this.props.createNewUser({
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phoneNumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
                avatar: this.state.avatar
            })
        }
        if (action === CRUD_ACTION.EDIT) {
            //fire redux edit user
            await this.props.editUserRedux({
                id: this.state.id,
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phoneNumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
                avatar: this.state.avatar,
            })
        }

        this.props.fetchUserRedux()
    }
    handleEditUserFromParent = (user) => {
        let imageBase64 = '';
        if (user.image) {
            imageBase64 = new Buffer(user.image, 'base64').toString('binary');
        }
        console.log(user)
        this.setState({
            id: user.id,
            email: user.email,
            password: 'HARDCODE',
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            address: user.address,
            gender: user.gender,
            position: user.positionId,
            role: user.roleId,
            avatar: '',
            action: CRUD_ACTION.EDIT,
            previewImg: imageBase64,
        })
    }
    render() {
        const genders = this.state.genders
        const positions = this.state.positions
        const roles = this.state.roles
        const language = this.props.language
        const isLoadingGender = this.props.isLoadingGender
        const { email, password, firstName, lastName, phoneNumber,
            address, gender, position, role, avatar
        } = this.state
        return (
            <div className="user-redux__container">
                <div className="title">
                    Learn React-Redux with "Trần Việt Tiến"
                </div>
                <div className="user-redux__body" >
                    <div className="container">
                        <div className="row">
                            <div className="col-12"><FormattedMessage id="manage-user.add" /></div>
                            <div className="col-12">{isLoadingGender ? 'loading gender...' : ''}</div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.email" /></label>
                                <input className="form-control" type='email'
                                    value={email}
                                    onChange={(e) => this.onchangeInput(e, 'email')}
                                    disabled={this.state.action === CRUD_ACTION.EDIT ? true : false}
                                />
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.password" /></label>
                                <input className="form-control" type='password'
                                    value={password}
                                    onChange={(e) => this.onchangeInput(e, 'password')}
                                    disabled={this.state.action === CRUD_ACTION.EDIT ? true : false}
                                />
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.first-name" /></label>
                                <input className="form-control" type='text'
                                    value={firstName}
                                    onChange={(e) => this.onchangeInput(e, 'firstName')}
                                />
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.last-name" /></label>
                                <input className="form-control" type='text'
                                    value={lastName}
                                    onChange={(e) => this.onchangeInput(e, 'lastName')}
                                />
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.phone" /></label>
                                <input className="form-control" type='text'
                                    value={phoneNumber}
                                    onChange={(e) => this.onchangeInput(e, 'phoneNumber')}
                                />
                            </div>
                            <div className="col-9">
                                <label><FormattedMessage id="manage-user.address" /></label>
                                <input className="form-control" type='text'
                                    value={address}
                                    onChange={(e) => this.onchangeInput(e, 'address')}
                                />
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.gender" /></label>
                                <select className="form-control"
                                    onChange={(e) => this.onchangeInput(e, 'gender')}
                                    value={gender}
                                >
                                    {
                                        genders
                                        && genders.length > 0
                                        && genders.map((gender, index) => (
                                            <option key={index} value={gender.keyMap}>
                                                {language === LANGUAGES.VI ? gender.valueVi : gender.valueEn}
                                            </option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.position" /></label>
                                <select className="form-control"
                                    onChange={(e) => this.onchangeInput(e, 'position')}
                                    value={position}
                                >
                                    {
                                        positions
                                        && positions.length > 0
                                        && positions.map((position, index) => (
                                            <option key={index} value={position.keyMap}>
                                                {language === LANGUAGES.VI ? position.valueVi : position.valueEn}
                                            </option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.role" /></label>
                                <select className="form-control"
                                    onChange={(e) => this.onchangeInput(e, 'role')}
                                    value={role}
                                >
                                    {
                                        roles
                                        && roles.length > 0
                                        && roles.map((role, index) => (
                                            <option key={index} value={role.keyMap}>
                                                {language === LANGUAGES.VI ? role.valueVi : role.valueEn}
                                            </option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.images" /></label>
                                <div className="preview__container">
                                    <input id="preview" hidden className="form-control-file" type='file'
                                        onChange={(e) => this.handleOnchangeImg(e)}
                                    />
                                    <label className="label-upload" htmlFor="preview">Tải ảnh<i className="fas fa-upload"></i></label>
                                    <div className="preview"
                                        style={{ backgroundImage: `url(${this.state.previewImg})` }}
                                        onClick={() => this.isOpenPreviewImage()}
                                    ></div>

                                </div>

                            </div>
                            <div className="col-12">
                                <button className={this.state.action === CRUD_ACTION.EDIT ? "btn btn-warning" : "btn btn-primary"}
                                    onClick={() => this.handleSaveUser()}

                                >
                                    {
                                        this.state.action === CRUD_ACTION.EDIT
                                            ? <FormattedMessage id="manage-user.edit" />
                                            : <FormattedMessage id="manage-user.save" />
                                    }

                                </button>

                            </div>

                            <div className="col-12 mt-3">
                                <TableManageUser
                                    handleEditUserFromParent={this.handleEditUserFromParent}
                                    actions={this.state.action}
                                />
                            </div>

                        </div>

                    </div>
                </div>
                {this.state.isOpen === true &&
                    <Lightbox
                        mainSrc={this.state.previewImg}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                }
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.gender,
        isLoadingGender: state.admin.isLoadingGender,
        position: state.admin.position,
        roles: state.admin.roles,
        users: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
        editUserRedux: (data) => dispatch(actions.editUSer(data)),


    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);

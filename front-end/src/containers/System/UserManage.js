import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { getAllUser, createNewUserService, deleteUserService, editUserService } from "../../services/userService";
import ModalUser from './ModalUser';
import ModalUserEdit from './ModalUserEdit';
import { emitter } from '../../utils/emitter';

class UserManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isShowModal: false,
            isShowModalEdit: false,
            userEdit: {}
        }
    }
    async componentDidMount() {
        await this.getAllUserFromReact();
    }
    getAllUserFromReact = async () => {
        const res = await getAllUser('ALL');
        if (res && res.errCode === 0) {
            if (res.user) {
                this.setState({
                    arrUsers: res.user
                })
            }
        }
    }
    handleAddNewUser = () => {
        this.setState({
            isShowModal: true
        })
    }
    toggleUserModal = () => {
        this.setState({
            isShowModal: false
        })
    }
    toggleUserModalEdit = () => {
        this.setState({
            isShowModalEdit: false,

        })
    }
    createNewUser = async (data) => {
        try {
            let response = await createNewUserService(data)
            if (response && response.errCode !== 0) {
                alert(response.errMessage)
            } else {
                await this.getAllUserFromReact();
                this.toggleUserModal()
                emitter.emit('EVENT_CLEAR_MODAL_DATA', { 'id': 'id' })
            }
        } catch (e) {
            console.log(e)
        }
    }
    deleteUser = async (user) => {
        try {
            const res = await deleteUserService(user.id)
            if (res && res.errCode !== 0) {
                alert(res.errMessage)
            } else {
                await this.getAllUserFromReact();
            }
        } catch (e) {
            console.log(e)
        }
    }
    handleEditUser = (user) => {
        this.setState({
            isShowModalEdit: true,
            userEdit: user
        })
    }
    doEditUser = async (user) => {
        try {
            const res = await editUserService(user)
            if (res && res.errCode === 0) {
                await this.getAllUserFromReact();
                this.toggleUserModalEdit()
            } else {
                alert(res.errMessage)
            }
        } catch (e) {
            console.log(e);
        }
    }
    render() {
        const { arrUsers } = this.state
        return (
            <div className="user-container">
                <ModalUser
                    isOpen={this.state.isShowModal}
                    toggleUserModal={this.toggleUserModal}
                    createNewUser={this.createNewUser}
                />
                {this.state.isShowModalEdit && <ModalUserEdit
                    isOpen={this.state.isShowModalEdit}
                    toggleUserModal={this.toggleUserModalEdit}
                    currentUser={this.state.userEdit}
                    editUser={this.doEditUser}
                />}

                <div className="title text-center"> Manage users with tien tran</div>
                <div className="mx-1">
                    <button
                        className="btn btn-primary px-2"
                        onClick={() => this.handleAddNewUser()}
                    >
                        <i className="fas fa-plus mx-1"></i>
                        Add new users
                    </button>
                </div>
                <div className="user-table mt-3 mx-1">
                    <table>
                        <tbody>
                            <tr className="header">
                                <th>Email</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Address</th>
                                <th>Action</th>
                            </tr>
                            {arrUsers && arrUsers.map((user, index) => (
                                <tr key={index}>
                                    <td>{user.email}</td>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.address}</td>
                                    <td className="control">
                                        <button
                                            className="btn-edit"
                                            onClick={() => this.handleEditUser(user)}
                                        ><i className="fas fa-edit"></i></button>
                                        <button
                                            className="btn-delete"
                                            onClick={() => this.deleteUser(user)}
                                        > <i className="fas fa-trash"></i></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);

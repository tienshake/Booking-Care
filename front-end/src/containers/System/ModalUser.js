
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter'
class ModalUserEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
        };

    }
    toggle = () => {
        this.props.toggleUserModal()
    }

    handelOnChangeInput = (e, id) => {
        let stateCopy = { ...this.state }
        stateCopy[id] = e.target.value
        this.setState({
            ...stateCopy
        })
    }
    checkValiDateInput = () => {
        let isValid = true
        const arrInput = ['email', 'password', 'firstName', 'lastName', 'address']
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                alert('missing parameter:' + arrInput[i])
                isValid = false
                break;
            }
        }
        return isValid;
    }
    handleGetModal = () => {
        let isValid = this.checkValiDateInput()
        if (isValid) {
            this.props.createNewUser(this.state)
        }
    }
    render() {
        return (

            <Modal
                isOpen={this.props.isOpen}
                toggle={() => this.toggle()}
                className={'hello'}
                size="lg"
                className={'modal-user-container'}
            >
                <ModalHeader toggle={() => this.toggle()}>Add new User</ModalHeader>
                <ModalBody>
                    <div className="container">
                        <div className="row">
                            <div className="col-6 ">
                                <label>Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    value={this.state.email}
                                    onChange={(e) => this.handelOnChangeInput(e, "email")}
                                ></input>
                            </div>
                            <div className="col-6 ">
                                <label>Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    value={this.state.password}
                                    onChange={(e) => this.handelOnChangeInput(e, "password")}
                                ></input>
                            </div>
                            <div className="col-6 ">
                                <label>First name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={this.state.firstName}
                                    onChange={(e) => this.handelOnChangeInput(e, "firstName")}
                                ></input>
                            </div>
                            <div className="col-6 ">
                                <label>Last name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={this.state.lastName}
                                    onChange={(e) => this.handelOnChangeInput(e, "lastName")}
                                ></input>
                            </div>
                            <div className="col-12 ">
                                <label>Address</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={this.state.address}
                                    onChange={(e) => this.handelOnChangeInput(e, "address")}
                                ></input>
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        onClick={() => this.toggle()}
                        onClick={() => this.handleGetModal()}
                        className={'px-2'}
                    >Add new </Button>{' '}
                    <Button
                        color="secondary"
                        onClick={() => this.toggle()}
                        className={'px-2'}
                    >Cancel</Button>
                </ModalFooter>
            </Modal>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUserEdit);


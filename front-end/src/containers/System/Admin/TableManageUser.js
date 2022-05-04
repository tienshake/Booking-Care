import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageUser.scss';
import * as actions from '../../../store/actions';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
    console.log('handleEditorChange', html, text);
}
class TableManageUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userRedux: []
        }
    }
    componentDidMount() {
        this.props.fetchUserRedux();
    }
    componentDidUpdate(prevProps, prevState) {

        if (prevProps.users !== this.props.users) {
            this.setState({
                userRedux: this.props.users
            })
        }
    }
    handleDeleteUser = async (user) => {
        await this.props.deleteUserRedux(user.id);
        this.props.fetchUserRedux();
    }
    handleEditUser = async (user) => {
        this.props.handleEditUserFromParent(user)
    }

    render() {
        const users = this.state.userRedux
        return (
            <>
                <div className="redux-table">
                    <table>
                        <tbody>
                            <tr className="header">
                                <th>Email</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Address</th>
                                <th>Action</th>
                            </tr>

                            {users && users.length > 0 && users.map((user, index) => (
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
                                            onClick={() => this.handleDeleteUser(user)}
                                        > <i className="fas fa-trash"></i></button>
                                    </td>
                                </tr>
                            ))}

                        </tbody>

                    </table>
                </div>
                <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} />
            </>

        );
    }

}

const mapStateToProps = state => {
    return {
        users: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
        deleteUserRedux: (id) => dispatch(actions.deleteUser(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);

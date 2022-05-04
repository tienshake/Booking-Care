import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './Specialty.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import CommonUtils from '../../../utils/CommonUtils';
import { createNewSpecialty } from '../../../services/userService';
import { toast } from 'react-toastify';


const mdParser = new MarkdownIt(/* Markdown-it options */);
class Specialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contentMarkdown: '',
            contentHTML: '',
            name: '',
            imageB64: '',
        }
    }
    componentDidMount() {

    }
    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html
        })
    }
    handleOnChangeInput = (e, id) => {
        let stateCopy = { ...this.state };
        stateCopy[id] = e.target.value;
        this.setState({ ...stateCopy });
    };
    handleOnchangeImg = async (e) => {
        const data = e.target.files;
        const file = data[0];
        if (file) {
            const b64 = await CommonUtils.getBase64(file);
            this.setState({
                imageB64: b64
            })
        }
    }
    handleOnClickSaveNew = async (e) => {
        try {
            const res = await createNewSpecialty(this.state);
            console.log(res);
            if (res && res.errCode === 0) {
                toast.success('Add new specialty success!');
                this.setState({
                    contentMarkdown: '',
                    contentHTML: '',
                    name: '',
                    imageB64: '',
                });
            } else {
                toast.error('Something wrongs...!!')
                console.log('Error from sever', res);
            }
        } catch (e) {
            console.log('error catch', e);
        }
    };
    render() {
        return (
            <div className="manage-specialty-container">
                <div className="specialty-title">Quản lý chuyên khoa</div>
                {/* <div className="btn-add-new-specialty">
                    <button className="btn btn-primary">addNew</button>
                </div> */}

                <div className="add-specialty row">
                    <div className="col-6 form-group">
                        <label>Tên chuyên khoa</label>
                        <input type="text" className="form-control"
                            value={this.state.name}
                            onChange={(e) => this.handleOnChangeInput(e, 'name')}

                        />
                    </div>
                    <div className="col-6 form-group">
                        <label>Ảnh chuyên khoa</label>
                        <input type="file" className="form-control-file"
                            value={this.state.image}
                            onChange={(e) => this.handleOnchangeImg(e)}
                        />
                    </div>
                    <div className="col-12">
                        <MdEditor
                            value={this.state.contentMarkdown}
                            style={{ height: '300px' }}
                            renderHTML={text => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                        />
                    </div>
                    <div className="col-12">
                        <button className="btn-primary btn"
                            onClick={() => this.handleOnClickSaveNew()}
                        >Lưu lại</button>
                    </div>
                </div>

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);

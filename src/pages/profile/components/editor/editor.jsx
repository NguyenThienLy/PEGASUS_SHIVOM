import * as React from 'react'
import './editor.scss'
import CKEditor from "react-ckeditor-component";
import { BaseModal } from '../../../../modals'
import { CloudImage } from '../../../../components';

export class Editor extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            content: "Nội dung bài viết"
        }
    }

    render() {
        return (
            <BaseModal show={true} handleClose={this.props.handleClose} style={{ height: "90%", width: "1000px" }}>

                <div className="editor-title">
                    <input type="text" placeholder="Tiêu đề bài viết"></input>
                    <div className="public-button">
                        <button>Đăng bài</button>
                    </div>
                </div>
                <div className="editor-main">
                <div className="editor-post-basic">
                    <div className="editor-description">
                        <textarea placeholder="Mô tả ngắn về bài viết của bạn"></textarea>
                    </div>
                    <div className="editor-thumbnail">
                        <div className="image">
                            <CloudImage src="https://demos.creative-tim.com/material-kit-react/static/media/bg.e5241971.jpg" />

                        </div>
                        {/* <div className="upload-image-button">
                            <button><i className="fas fa-cloud-upload-alt"></i> <span>Upload image</span></button>

                        </div> */}
                    </div>
                    </div>
                    <div></div>
                    <div>
                        <CKEditor
                            activeClass="add-post-content"
                            content={this.state.content}
                            events={{
                                "blur": this.onBlur,
                                "afterPaste": this.afterPaste,
                                "change": this.onChange
                            }}

                        />
                    </div>
                </div>
            </BaseModal>
        )
    }
}


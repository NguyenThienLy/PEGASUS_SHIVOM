import * as React from 'react'
import './editorPost.scss';
import CKEditor from "react-ckeditor-component";
import { BaseModal } from '../../../../modals'
import { CloudImage } from '../../../../components';
import Modal from 'react-awesome-modal';

export class EditorPost extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        return (
            <Modal visible={this.props.visible} width="600" height="600" effect="fadeInUp"
                onClickAway={this.props.closeEditor}>
                <div className="editor">
                    <div className="editor__title">
                        <input type="text" name="title-post" id="title-post" placeholder="Tiêu đề bài viết" />

                    </div>
                </div>
            </Modal>
            // <div>test editor</div>
        )
    }
}


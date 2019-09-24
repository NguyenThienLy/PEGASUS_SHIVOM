import * as React from "react";
import "./tinymceEditor.scss";
import { Editor } from '@tinymce/tinymce-react';

export class TinymceEditor extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    // $(function () {
    //   tinymce.init({
    //     selector: "#my_editor",
    //     height: 500,
    //     menubar: false,
    //     plugins: "paste image link autolink lists table media",
    //     toolbar: [
    //       "undo redo | bold italic underline strikethrough | numlist bullist | alignleft aligncenter alignright | forecolor backcolor | table link image media"
    //     ],
    //     init_instance_callback: function (editor) {
    //       editor.on('Change', function (e) {
    //         console.log('Editor contents was changed.');
    //       });
    //     }
    //   });
    // });
  }
  handleChange(e) {
    this.props.handleChange(this.props.varName, e.target.getContent())
  }
  render() {
    return (
      <div className="tinymce-editor">
        <div className="tinymce-editor__title">Nội dung bài viết</div>
        <hr className="divider" />
        {/* <div className="tinymce-editor__content">
          <textarea id="my_editor" onChange={this.handleChange}></textarea>
        </div> */}
        <Editor
          initialValue=""
          init={{
            height: 500,
            menubar: false,
            plugins: "paste image link autolink lists table media",
            toolbar: [
              "undo redo | bold italic underline strikethrough | numlist bullist | alignleft aligncenter alignright | forecolor backcolor | table link image media"
            ]
          }}
          onChange={this.handleChange}
        />
        {/* <div className="tinymce-editor__button">
          <button>
            Tiếp tục <i className="fas fa-chevron-right"></i>
          </button>
        </div> */}
      </div>
    );
  }
}

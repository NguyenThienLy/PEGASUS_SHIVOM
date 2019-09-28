import * as React from "react";
import "./tinymceEditor.scss";
import { Editor } from "@tinymce/tinymce-react";

export class TinymceEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: {
        content: "",
        isValid: false,
        errorMessage: ""
      },
      validate: {
        rules: {
          description: {
            required: true
          }
        },
        messages: {
          description: {
            required: "Bắt buộc nhập nội dung"
          }
        }
      }
    };
    this.handleChange = this.handleChange.bind(this);
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
  handleChange(content, editor) {
    const name = this.props.varName;

    this.handleEditorValidation("description", content);
    this.props.handleIsValid(
      this.props.pageNumber,
      this.state.description.isValid
    );
    this.props.handleChange(name, content);
  }
  handleEditorValidation = (name, content) => {
    _.forEach(this.state.validate.rules, (rule, key) => {
      if (name === key) {
        if (rule.required && content.length === 0) {
          this.setState({
            description: _.merge(this.state.description, {
              content: content,
              isValid: false,
              errorMessage: this.state.validate.messages[key].required
            })
          });
        } else {
          this.setState({
            description: _.merge(this.state.description, {
              content: content,
              isValid: true,
              errorMessage: ""
            })
          });
        }
        return;
      }
    });
  };
  render() {
    return (
      <div className="tinymce-editor">
        <div className="tinymce-editor__title">Nội dung bài viết</div>
        <hr className="divider" />
        {/* <div className="tinymce-editor__content">
          <textarea id="my_editor" onChange={this.handleChange}></textarea>
        </div> */}
        <div className="tinymce-editor__content">
          <small className="tinymce-editor__content__error-message">
            {this.state.description.errorMessage}
          </small>
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
            onEditorChange={this.handleChange}
          />
        </div>

        {/* <div className="tinymce-editor__button">
          <button>
            Tiếp tục <i className="fas fa-chevron-right"></i>
          </button>
        </div> */}
      </div>
    );
  }
}

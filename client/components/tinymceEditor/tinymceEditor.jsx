import * as React from "react";
import "./tinymceEditor.scss";

export class TinymceEditor extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    $(function() {
      tinymce.init({
        selector: "#my_editor",
        height: 500,
        menubar: false,
        plugins: "paste image link autolink lists table media",
        toolbar: [
          "undo redo | bold italic underline strikethrough | numlist bullist | alignleft aligncenter alignright | forecolor backcolor | table link image media"
        ]
      });
    });
  }

  render() {
    return (
      <div className="tinymce-editor">
        <div className="tinymce-editor__title">Nội dung bài viết</div>
        <hr className="divider" />
        <div className="tinymce-editor__content">
          <textarea id="my_editor"></textarea>
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

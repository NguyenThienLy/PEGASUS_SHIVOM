import * as React from "react";

import "./baseModal.scss";
class BaseModal extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { show, handleClose, children, style = {} } = this.props
    const showModalClass = show ? "modal display-block" : "modal display-none"
    return (
      <div className={showModalClass}>
        <section className="modal-main" style={style}>
          <button onClick={handleClose} className="modal-close-button"><i className="fas fa-times"></i></button>
          <div className="modal-content">
            {children}
          </div>
        </section>
      </div>
    );
  }
}

export default BaseModal;

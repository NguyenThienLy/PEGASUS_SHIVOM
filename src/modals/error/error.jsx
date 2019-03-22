import * as React from "react";
import BaseModal from '../base/baseModal'
import "./error.scss";
class Error extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { show, handleClose, children } = this.props
    const showModalClass = show ? "modal display-block" : "modal display-none"
    return (
      <BaseModal  {...this.props}>
        {children}
        <div className="error-icon">
          <i class="far fa-times-circle"></i>
        </div>
      </BaseModal>
      // <div className={showModalClass}>
      //   <section className="modal-main">
      //     <button onClick={handleClose} className="modal-close-button"><i class="fas fa-times"></i></button>
      //     <div className="modal-content">
      //       {children}
      //       <div className="error-icon">
      //         <i class="far fa-times-circle"></i>
      //       </div>

      //     </div>
      //   </section>
      // </div>
    );
  }
}

export default Error;

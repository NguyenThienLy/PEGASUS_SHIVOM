import * as React from "react";
import BaseModal from '../base/baseModal'
import "./warning.scss";
class Warning extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { show, handleClose, children } = this.props
    const showModalClass = show ? "modal display-block" : "modal display-none"
    return (
      <BaseModal {...this.props}>
      {children}
      <div className="warning-icon">
          <i class="far fa-times-circle"></i>
        </div>
      </BaseModal>
      // <div className={showModalClass}>
      //   <section className="modal-main">
      //     <button onClick={handleClose} className="modal-close-button"><i class="fas fa-times"></i></button>
      //     <div className="modal-content">
      //       {children}
      //       <div class="check_mark success-icon">
      //         <div class="sa-icon sa-success animate">
      //           <span class="sa-line sa-tip animateSuccessTip"></span>
      //           <span class="sa-line sa-long animateSuccessLong"></span>
      //           <div class="sa-placeholder"></div>
      //           <div class="sa-fix"></div>
      //         </div>
      //       </div>
      //     </div>
      //   </section>
      // </div>
    );
  }
}

export default Warning;

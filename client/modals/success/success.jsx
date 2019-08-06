import * as React from "react";
import BaseModal from '../base/baseModal'
import "./success.scss";
class Success extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { show, handleClose, children } = this.props
    const showModalClass = show ? "modal display-block" : "modal display-none"
    return (
      <BaseModal {...this.props}>
      {children}
            <div className="check_mark success-icon">
              <div className="sa-icon sa-success animate">
                <span className="sa-line sa-tip animateSuccessTip"></span>
                <span className="sa-line sa-long animateSuccessLong"></span>
                <div className="sa-placeholder"></div>
                <div className="sa-fix"></div>
              </div>
            </div>
      </BaseModal>
    
    );
  }
}

export default Success;

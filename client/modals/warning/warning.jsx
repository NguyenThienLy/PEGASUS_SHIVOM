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
          <i className="far fa-times-circle"></i>
        </div>
      </BaseModal>
    
    );
  }
}

export default Warning;

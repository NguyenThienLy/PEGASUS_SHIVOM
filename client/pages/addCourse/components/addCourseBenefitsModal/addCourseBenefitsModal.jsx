import React, { Component } from "react";
// import Modal from 'react-awesome-modal';
import "./addCourseBenefitsModal.scss";
import { Modal } from "../../../../modals";
import { AddCourseBenefitsForm } from "../../../../components";

export class AddCourseBenefitsModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
    this.submit = this.submit.bind(this);
  }
  componentDidMount() {}

  closeModal() {
    this.props.hideModal();
  }
  submit(body) {
    this.props.hideModal();
    this.props.addCourseBenefits(body);
  }
  render() {
    const { show } = this.props;
    return (
      <section>
        <Modal
          visible={show}
          width="600"
          height="auto"
          effect="fadeInUp"
          onClickAway={() => this.closeModal()}
        >
          <AddCourseBenefitsForm addCourseBenefits={this.submit} />
        </Modal>
      </section>
    );
  }
}

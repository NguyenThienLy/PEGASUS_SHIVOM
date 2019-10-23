import React, { Component } from "react";
import "./updateCourseBenefitsModal.scss";
import { Modal } from "../../../../../../modals";
import { UpdateCourseBenefitsForm } from "../updateCourseBenefitsForm/updateCourseBenefitsForm";

export class UpdateCourseBenefitsModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
    this.submit = this.submit.bind(this);
  }
  componentDidMount() { }

  closeModal() {
    this.props.hideModal();
  }
  submit(body) {
    this.props.hideModal();
    this.props.handleAddBenefits(body);
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
          <UpdateCourseBenefitsForm handleAddBenefits={this.submit} />
        </Modal>
      </section>
    );
  }
}

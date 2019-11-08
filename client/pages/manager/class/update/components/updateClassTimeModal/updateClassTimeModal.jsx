import React, { Component } from "react";
// import Modal from 'react-awesome-modal';
import "./updateClassTimeModal.scss";
import { Modal } from "../../../../../../modals";
import { UpdateClassTimeForm } from "../UpdateClassTimeForm/UpdateClassTimeForm";

export class UpdateClassTimeModal extends Component {
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
    this.props.handleAddClassTime(body);
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
          <UpdateClassTimeForm handleAddClassTime={this.submit} rooms={this.props.rooms} />
        </Modal>
      </section>
    );
  }
}

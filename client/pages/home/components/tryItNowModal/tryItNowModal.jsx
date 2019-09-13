import React, { Component } from 'react';
// import Modal from 'react-awesome-modal';
import './tryItNowModal.scss'
import { Modal } from '../../../../modals/'
import { TryItNowForm } from '../../../../components';

export class TryItNowModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,

        }
        this.submit = this.submit.bind(this)
    }
    componentDidMount() {

    }

    closeModal() {
        this.props.hideModal()
    }
    submit(body) {
        this.props.hideModal()
        this.props.addContact(body)
    }
    render() {
        const { show } = this.props
        return (
            <section>

                <Modal visible={show} width="500" height="auto" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                    <TryItNowForm addContact={this.submit}
                        courses={this.props.courses} />
                </Modal>
            </section>
        );
    }
}
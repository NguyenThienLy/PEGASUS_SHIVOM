import React, { Component } from "react";
import { Modal } from "../../../../../../modals";
import "./relearn.scss"

import { Form } from '../../../../../../components'

export class Relearn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            title: "Học viên đi học lại",
            form: {
                cardId: {
                    type: "text",
                    label: "Mã thẻ",
                    placeholder: "123456789",
                    value: "",
                    isValid: false,
                    errorMessage: ""
                }
            },
            validate: {
                rules: {
                    cardId: {
                        required: true
                    }
                },
                messages: {
                    cardId: {
                        required: "Bắt buộc nhập mã thẻ"
                    }
                }
            }

        };
        this.submit = this.submit.bind(this);
    }

    componentDidMount() { }

    closeModal() {
        this.props.hideModal();
    }
    submit(body) {
        this.props.hideModal();
        this.props.relearn(body);
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
                    <Form
                        title={this.state.title}
                        form={this.state.form}
                        validate={this.state.validate}
                        submit={this.submit}
                    />
                </Modal>
            </section>
        );
    }
}

import React, { Component } from "react";
import { Modal } from "../../../../../../modals";
import "./leave.scss"

import { Form } from '../../../../../../components'

export class Leave extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            title: "Học viên nghỉ học",
            form: {
                isRemoveCard: {
                    type: "radio",
                    label: "Xoá mã thẻ của học viên",
                    placeholder: "",
                    options: [
                        {
                            name: "Xoá thẻ",
                            value: true
                        },
                        {
                            name: "Giữ thẻ",
                            value: false
                        }
                    ],
                    value: true,
                    isValid: false,
                    errorMessage: ""
                }
            },
            validate: {
                rules: {
                    isRemoveCard: {
                        required: false
                    }
                },
                messages: {
                    isRemoveCard: {
                        required: ""
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
        body.isRemoveCard = JSON.parse(body.isRemoveCard)
        this.props.addPoint(body);
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

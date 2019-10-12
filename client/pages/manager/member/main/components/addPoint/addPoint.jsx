import React, { Component } from "react";
import { Modal } from "../../../../../../modals";
import "./addPoint.scss"

import { Form } from '../../../../../../components'

export class AddPoint extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            title: "Thêm điểm cho học viên",
            form: {
                point: {
                    type: "number",
                    label: "Số điểm",
                    placeholder: 1,
                    value: 1,
                    isValid: false,
                    errorMessage: ""
                },
                content: {
                    type: "text",
                    label: "Lý do",
                    placeholder: "Lý do thêm điểm",
                    value: "",
                    isValid: false,
                    errorMessage: ""
                }
            },
            validate: {
                rules: {
                    point: {
                        required: true
                    },
                    content: {
                        required: true
                    }
                },
                messages: {
                    point: {
                        required: "Bắt buộc nhập số điểm"
                    },
                    content: {
                        required: "Bắt buộc nhập lý do"
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

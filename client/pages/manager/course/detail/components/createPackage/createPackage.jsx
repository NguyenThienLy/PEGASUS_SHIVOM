import React, { Component } from "react";
import { Modal } from "../../../../../../modals";
import "./createPackage.scss"

import { Form } from '../../../../../../components'

export class CreatePackage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            title: "Tạo gói",
            form: {
                name: {
                    type: "text",
                    label: "Tên gói",
                    placeholder: "Tên gói",
                    value: "",
                    isValid: false,
                    errorMessage: ""
                },
                monthAmount: {
                    type: "number",
                    label: "Số tháng",
                    placeholder: "Số tháng",
                    value: 1,
                    isValid: false,
                    errorMessage: ""
                },
                price: {
                    type: "number",
                    label: "Giá thực thu",
                    placeholder: "Giá thực thu của học viên",
                    value: "",
                    isValid: true,
                    errorMessage: ""
                },
                discount: {
                    type: "number",
                    label: "Giá giảm",
                    placeholder: "Giá giảm hiển thị",
                    value: 0,
                    isValid: false,
                    errorMessage: ""
                }
            },
            validate: {
                rules: {
                    name: {
                        required: true
                    },
                    monthAmount: {
                        required: true
                    },
                    price: {
                        required: true
                    },
                    discount: {
                        required: true
                    }
                },
                messages: {
                    name: {
                        required: "Bắt buộc nhập tên gói"
                    },
                    monthAmount: {
                        required: "Bắt buộc nhập số tháng"
                    },
                    price: {
                        required: "Bắt buộc nhập giá"
                    },
                    discount: {
                        required: "Bắt buộc nhập giá giảm"
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
        this.props.createPackage(body);
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

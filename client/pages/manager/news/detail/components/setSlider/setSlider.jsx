import React, { Component } from "react";
import { Modal } from "../../../../../../modals";
import "./setSlider.scss"

import { Form } from '../../../../../../components'

export class SetSlider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            title: "Thiết lập slider",
            form: {
                title: {
                    type: "text",
                    label: "Tiêu đề",
                    placeholder: "Tiêu đề",
                    value: "",
                    isValid: false,
                    errorMessage: ""
                },
                description: {
                    type: "text",
                    label: "Mô tả",
                    placeholder: "Mô tả",
                    value: "",
                    isValid: false,
                    errorMessage: ""
                },
                buttonTitle: {
                    type: "text",
                    label: "Tiêu đề nút",
                    placeholder: "Tiêu đề nút",
                    value: "",
                    isValid: true,
                    errorMessage: ""
                },
                image: {
                    type: "image",
                    label: "Ảnh slide",
                    placeholder: "Tải lên ảnh slide",
                    value: "",
                    isValid: false,
                    errorMessage: ""
                }
            },
            validate: {
                rules: {
                    title: {
                        required: true
                    },
                    description: {
                        required: true
                    },
                    buttonTitle: {
                        required: true
                    },
                    image: {
                        required: true
                    }
                },
                messages: {
                    title: {
                        required: "Bắt buộc nhập tiêu đề"
                    },
                    description: {
                        required: "Bắt buộc nhập mô tả"
                    },
                    buttonTitle: {
                        required: "Bắt buộc nhập tên nút"
                    },
                    image: {
                        required: "Bắt buộc phải có ảnh"
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
        console.log("body: ", body)
        this.props.hideModal();
        this.props.setSlider(body);
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
                        title="Thiết lập slider"
                        form={this.state.form}
                        validate={this.state.validate}
                        submit={this.submit}
                    />
                </Modal>
            </section>
        );
    }
}

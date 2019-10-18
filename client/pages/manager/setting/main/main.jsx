import * as React from "react";
import { Form } from '../../../../components'
import { action } from '../../../../actions';
import { api } from '../../../../services';
import Swal from 'sweetalert2';

export class MainSetting extends React.Component {
    constructor(props) {
        super(props);
        this.state = {


        };
        this.submit = this.submit.bind(this);
        this.submitContact = this.submitContact.bind(this)
        this.submitLogo = this.submitLogo.bind(this)
        this.submitSocial = this.submitSocial.bind(this)
    }

    componentDidMount() { }
    async submitLogo(body) {

        const link = await api.imgur.uploadImage(body.logo)
        this.submit({
            logo: link
        })
    }
    submitContact(body) {
        this.submit({
            contact: body
        })
    }
    submitSocial(body) {
        this.submit({
            social: body
        })
    }
    submit(body) {
        Swal.showLoading()
        api.setting.update(this.props.setting._id, body)
            .then(res => {
                Swal.fire("Thành công", "Cập nhật thiết lập website thành công", "success")
                this.props.dispatch({
                    type: "UPDATE_SETTING_SUCCESS",
                    payload: res.result.object
                })
                this.forceUpdate()
            })
            .catch(err => {
                Swal.fire("Thất bại", "Cập nhật thiết lập website thất bại", "success")
            })
    }
    render() {
        console.log("setting: ", this.props.setting)
        return (
            <React.Fragment>
                <Form
                    title="Thiết lập logo website"
                    form={{
                        logo: {
                            type: "image",
                            label: "Logo",
                            placeholder: "Tải lên logo",
                            value: "",
                            isValid: false,
                            errorMessage: ""
                        }

                    }}
                    validate={{
                        rules: {
                            logo: {
                                required: true
                            }
                        },
                        messages: {
                            logo: {
                                required: "Bắt buộc phải có ảnh"
                            }
                        }
                    }}
                    submit={this.submitLogo}
                />
                <hr />
                <Form
                    title="Thiết lập thông tin liên hệ"
                    form={{
                        brand: {
                            type: "text",
                            label: "Brand",
                            defaultValue: this.props.setting.contact.brand,
                            value: this.props.setting.contact.brand,
                            isValid: true,
                            errorMessage: ""
                        },
                        title: {
                            type: "text",
                            label: "Tiêu đề",
                            defaultValue: this.props.setting.contact.title,
                            value: this.props.setting.contact.title,
                            isValid: true,
                            errorMessage: ""
                        },
                        description: {
                            type: "text",
                            label: "Mô tả",
                            defaultValue: this.props.setting.contact.description,
                            value: this.props.setting.contact.description,
                            isValid: true,
                            errorMessage: ""
                        },
                        phone: {
                            type: "text",
                            label: "Số điện thoại",
                            defaultValue: this.props.setting.contact.phone,
                            value: this.props.setting.contact.phone,
                            isValid: true,
                            errorMessage: ""
                        },
                        email: {
                            type: "text",
                            label: "Email",
                            defaultValue: this.props.setting.contact.email,
                            value: this.props.setting.contact.email,
                            isValid: true,
                            errorMessage: ""
                        },
                        address: {
                            type: "text",
                            label: "Địa chỉ",
                            defaultValue: this.props.setting.contact.address,
                            value: this.props.setting.contact.address,
                            isValid: true,
                            errorMessage: ""
                        },

                    }}
                    validate={{
                        rules: {

                        },
                        messages: {

                        }
                    }}
                    submit={this.submitContact}
                />
                <hr />
                <Form
                    title="Thiết lập liên kết mạng xã hội"
                    form={{
                        facebook: {
                            type: "text",
                            label: "Facebook",
                            defaultValue: this.props.setting.social.facebook,
                            value: this.props.setting.social.facebook,
                            isValid: true,
                            errorMessage: ""
                        },
                        google: {
                            type: "text",
                            label: "Google plus",
                            defaultValue: this.props.setting.social.google,
                            value: this.props.setting.social.google,
                            isValid: true,
                            errorMessage: ""
                        },
                        instagram: {
                            type: "text",
                            label: "Instagram",
                            defaultValue: this.props.setting.social.instagram,
                            value: this.props.setting.social.instagram,
                            isValid: true,
                            errorMessage: ""
                        },
                        youtube: {
                            type: "text",
                            label: "Youtube",
                            defaultValue: this.props.setting.social.youtube,
                            value: this.props.setting.social.youtube,
                            isValid: true,
                            errorMessage: ""
                        }

                    }}
                    validate={{
                        rules: {

                        },
                        messages: {

                        }
                    }}
                    submit={this.submitSocial}
                />

            </React.Fragment>
        );
    }
}

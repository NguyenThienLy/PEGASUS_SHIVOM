import React, { Component } from "react";
import "./form.scss"

import { ImageUpload, TimePickerModal } from '../index'
import DatePicker from "react-datepicker"
import * as moment from 'moment'

export class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {


        };
        this.submit = this.submit.bind(this);
        this.checkFormValid = this.checkFormValid.bind(this);
    }
    checkFormValid() {
        for (const key in this.props.form) {
            if (!this.props.form[key].isValid) {
                console.log("key khong valid: ", this.props.form[key])
                return false;
            }
        }
        return true;
    }
    componentDidMount() {
        $('.newMemberInfo__input-box--date').datetimepicker({
            format: 'd/m/Y',
            timepicker: false,
            mask: false
        });
    }
    submit(e) {
        e.preventDefault();
        if (this.checkFormValid()) {
            const bodyKeys = Object.keys(this.props.form)
            const body = {}
            for (const key of bodyKeys) {
                if (this.props.form[key].type === "number") {
                    body[key] = Number(this.props.form[key].value)
                } else {
                    body[key] = this.props.form[key].value
                }

            }
            this.props.submit(body);
        } else {
            alert("Vui lòng kiểm tra lại thông tin");
        }
    }
    handleChange = event => {

        let { name, value } = event.target;
        value = value.trim();
        this.handleInputValidation(name, value);
    };
    handleInputValidation = (name, value) => {
        let isFound = false
        _.forEach(this.props.validate.rules, (rule, key) => {
            if (name === key) {
                isFound = true
                if (rule.required && value.length === 0) {
                    this.setState({
                        form: _.merge(this.props.form, {
                            [key]: {
                                value: value,
                                isValid: false,
                                errorMessage: this.props.validate.messages[key].required
                            }
                        })
                    });
                } else if (
                    rule.regexr &&
                    value.length > 0 &&
                    !rule.regexr.test(value)
                ) {
                    // let isValid = rule.required ? false : true
                    // if(value >
                    this.setState({
                        form: _.merge(this.props.form, {
                            [key]: {
                                value: value,
                                isValid: false,
                                errorMessage: this.props.validate.messages[key].regexr
                            }
                        })
                    });
                } else {
                    this.setState({
                        form: _.merge(this.props.form, {
                            [key]: {
                                value: value,
                                isValid: true,
                                errorMessage: ""
                            }
                        })
                    });
                    if (this.props.form[key].isHandleChange) {
                        this.props.handleChange(name, value)
                    }
                }
                return;
            }
        });
        if (!isFound) {
            this.setState({
                form: _.merge(this.props.form, {
                    [name]: {
                        value: value,
                        isValid: true,
                        errorMessage: ""
                    }
                })
            });
            if (this.props.form[name].isHandleChange) {
                this.props.handleChange(name, value)
            }
        }
    };
    changeImageFile(file, fileUrl) {
        this.handleInputValidation(this.keyName, file)
    }

    render() {

        return (
            <div class="form">
                <div>
                    <h3>{this.props.title}</h3>
                </div>
                <form
                    className="form__body"
                    onSubmit={this.submit}
                >
                    {Object.keys(this.props.form).map((keyName, index) => {
                        if (["text", "number"].indexOf(this.props.form[keyName].type) !== -1 && !this.props.form[keyName].hidden) {
                            return (
                                <React.Fragment>
                                    <label className="form__body__label">{this.props.form[keyName].label}</label>
                                    <input
                                        type={this.props.form[keyName].type}
                                        placeholder={this.props.form[keyName].placeholder}
                                        className="form__body__input"
                                        defaultValue={this.props.form[keyName].defaultValue}
                                        ref={keyName}
                                        name={keyName}
                                        onChange={this.handleChange}
                                        onBlur={this.handleChange}
                                        readOnly={this.props.form[keyName].readonly ? true : false}
                                    />
                                    <small className="form__body__error-message">
                                        {this.props.form[keyName].errorMessage}
                                    </small>
                                </React.Fragment>
                            )
                        }
                        if (["image"].indexOf(this.props.form[keyName].type) !== -1 && !this.props.form[keyName].hidden) {
                            return (
                                <React.Fragment>
                                    <label className="form__body__label">{this.props.form[keyName].label}</label>
                                    <ImageUpload changeImage={this.changeImageFile.bind({ keyName, handleInputValidation: this.handleInputValidation })} title={this.props.form[keyName].placeholder}></ImageUpload>
                                    <small className="form__body__error-message">
                                        {this.props.form[keyName].errorMessage}
                                    </small>
                                </React.Fragment>
                            )
                        }
                        if (["select"].indexOf(this.props.form[keyName].type) !== -1 && !this.props.form[keyName].hidden) {
                            return (
                                <React.Fragment>
                                    <label className="form__body__label">{this.props.form[keyName].label}</label>

                                    <select
                                        className="form__body__select"
                                        ref={keyName}
                                        name={keyName}
                                        onChange={this.handleChange}
                                        onBlur={this.handleChange}
                                    >
                                        {this.props.form[keyName].options.map((option, index) => {
                                            return (
                                                <option value={option.value} key={index}>{option.name}</option>
                                            )
                                        })}
                                    </select>

                                    <small className="form__body__error-message">
                                        {this.props.form[keyName].errorMessage}
                                    </small>
                                </React.Fragment>
                            )
                        }
                        if (["radio"].indexOf(this.props.form[keyName].type) !== -1) {
                            return (
                                <React.Fragment>
                                    <label className="form__body__label">{this.props.form[keyName].label}</label>
                                    {this.props.form[keyName].options.map((option, index) => {
                                        return (
                                            <div>
                                                <input
                                                    type="radio"
                                                    name={keyName}
                                                    value={option.value}
                                                    onChange={this.handleChange}
                                                    onBlur={this.handleChange}
                                                />{option.name}
                                            </div>
                                        )
                                    })}

                                    <small className="form__body__error-message">
                                        {this.props.form[keyName].errorMessage}
                                    </small>
                                </React.Fragment>
                            )
                        }
                        if (["datetime"].indexOf(this.props.form[keyName].type) !== -1) {

                            return (
                                <React.Fragment>
                                    <label className="form__body__label">{this.props.form[keyName].label}</label>
                                    {/* <input
                                        type="text"
                                        placeholder={this.props.form[keyName].placeholder}
                                        className="form__body__input newMemberInfo__input-box newMemberInfo__input-box--date"
                                        ref={keyName}
                                        name={keyName}
                                        onChange={this.handleChange}
                                        onBlur={this.handleChange}
                                    /> */}

                                    <DatePicker
                                        className="form__body__input"
                                        selected={moment(this.props.form[keyName].value).toDate()}
                                        onChange={(date) => {
                                            return this.handleInputValidation(keyName, moment(date).format())
                                        }}
                                        showTimeSelect
                                        timeFormat="HH:mm"
                                        timeIntervals={15}
                                        dateFormat="dd/MM/yyyy"
                                        timeCaption="time"
                                    />
                                    {/* <TimePickerModal varName="endTime" time={this.props.form[keyName].value} show={this.props.form[keyName].show} hideModal={this.toggleTimekeeper} handleTimeChange={this.handleTimeChange} /> */}
                                    <small className="form__body__error-message">
                                        {this.props.form[keyName].errorMessage}
                                    </small>
                                </React.Fragment>
                            )
                        }
                    })
                    }
                    <button
                        type="submit"
                        className="form__body__btn form__body__btn--primary"
                    >
                        {this.props.buttonTitle || "Gửi"}
                    </button>
                </form>
            </div>
        );
    }
}

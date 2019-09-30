import * as React from "react";
import Swal from "sweetalert2";
import { AddPostForm } from "./components";


import { action } from '../../../../actions'
import {api } from '../../../../services'

import "./add.scss"
export class AddNews extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: {
                title: "",
                metaTitle: "",
                metaDescription: "",
                slug: "",
                thumb: "",
                category: "",
                thumbUrl: "",
                description: "",
                content: "",
                author: "5d48ec5fab0daa9d2c4080c8"
            },
            isValidSubmit: false
        }
        this.handleIsValid = this.handleIsValid.bind(this);
        this.handleInputForm = this.handleInputForm.bind(this);
        this.submitPost = this.submitPost.bind(this);
    }
    fetchData() {
        
    }
    async componentDidMount() {
        var heightOfHeader = $(
            ".add-post .add-post__header .headerAdmin__wrapper"
        ).height();
        $(".add-post .add-post__body").css("margin-top", heightOfHeader + "px");

        this.fetchData();
    }
    handleIsValid = function (pageNumber, isValid) {
        this.setState({ isValidSubmit: isValid });
    };
    handleInputForm(name, value) {
        this.state.formData[name] = value;
        this.setState({ formData: this.state.formData });
    }
    async submitPost() {
        if (!this.state.isValidSubmit) {
            alert("Vui lòng kiểm tra lại thông tin");
            return;
        }

        Swal.showLoading();
        let imageLink;
        if (this.state.formData.thumb !== "") {
            imageLink = await api.imgur.uploadImage(this.state.formData.thumb);
            this.state.formData.thumb = imageLink;
        }
        api.news
            .create(this.state.formData, {
                headers: {
                    "x-token":
                        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYWRtaW4iLCJfaWQiOiI1ZDQ4ZWM1ZmFiMGRhYTlkMmM0MDgwYzgiLCJleHBpcmVkQXQiOiIyMDE5LTA4LTI1VDIzOjE0OjA3KzA3OjAwIn0.ngV8I2vD652qTIwum2F4lTEx1brQ8TABgiOmVfY7v8M"
                }
            })
            .then(res => {
                Swal.fire("Thành công", "Thêm bài viết thành công", "success");
            })
            .catch(err => {
                console.log("err");
                Swal.fire("Thất bại", "Thêm bài viết không thành công", "error");
            });
    }

    render() {

        return (
            <div className="add-post">
        
          <div className="add-post__body">
            <div className="add-post__body__card">
              <div className="add-post__body__card__title">Thêm bài viết</div>
              <div className="add-post__body__card__content">
                <div
                  className="add-post__body__card__content__info animated
                      fadeIn"
                >
                  <AddPostForm
                    categories={this.props.newCategories.items}
                    handleChange={this.handleInputForm}
                    handleIsValid={this.handleIsValid}
                    pageNumber="1"
                  />
                </div>
              </div>
              <div className="add-post__body__card__buttons">
                <button className="add-post__body__card__buttons__btn">
                  Lưu nháp
                </button>
                <button
                  className="add-post__body__card__buttons__btn"
                  onClick={this.submitPost}
                >
                  Đăng
                </button>
              </div>
            </div>
          </div>
      </div>
        );
    }
}

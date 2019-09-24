import * as React from "react";
import Head from "next/head";
import Link from "next/link";
import Router from "next/router"
import { connect } from "react-redux";
import { api } from "../../../services";
import { action } from "../../../actions";
import { bindActionCreators } from 'redux'
import Swal from "sweetalert2";

import "./addPost.scss";
import { Header, Footer, HeaderAdmin, Sidebar } from "../../../components";
import { AddPostForm } from "./components";

class AddPost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            headerAdmin: {
                avatar:
                    "https://cdn1.iconfinder.com/data/icons/avatars-1-5/136/87-512.png",
                name: "Avril Lavigne"
            },
            categories: [
                {
                    name: "trang chủ",
                    linkHref: "/home/home",
                    linkAs: "/",
                    key: "home"
                },
                {
                    name: "khoá học",
                    key: "course",
                    subCategories: []
                },
                {
                    name: "tin tức",
                    key: "news",
                    subCategories: [
                        {
                            name: "khoá học môt",
                            linkHref: "/blog/blog?categorySlug=khoa-hoc-not",
                            linkAs: "/khoa-hoc-mot"
                        },
                        {
                            name: "khoá học hai",
                            linkHref: "/home/home",
                            linkAs: "/"
                        },
                        {
                            name: "khoá học ba",
                            linkHref: "/home/home",
                            linkAs: "/"
                        }
                    ]
                },
                {
                    name: "về chúng tôi",
                    linkHref: "/contact/contact",
                    linkAs: "/lien-he",
                    key: "about"
                }
            ],
            formData: {
                title: "",
                metaTitle: "",
                metaDescription:"",
                slug: "",
                thumb: "",
                category: "",
                thumbUrl: "",
                description: "",
                content: "",
                author: "5d48ec5fab0daa9d2c4080c8"
            }
        };
        this.handleInputForm = this.handleInputForm.bind(this)
        this.submitClass = this.submitClass.bind(this)
    }
    static async getInitialProps({ req, query }) {
        return { type: query.type };
    }
    fetchData(){
        this.props.fetchCategory({
            query: {
                limit: 0
            }
        })
    }
    async componentDidMount() {
        this.fetchData()
        if (this.props.courses.items.length > 0) {
            const courseCategoryIndex = this.state.categories.findIndex(item => {
                return item.key === "course";
            });
            const subCategories = this.props.courses.items.map(item => {
                return {
                    name: item.name,
                    linkHref: `/course/course?slug=${item.slug}`,
                    linkAs: `/khoa-hoc/${item.slug}`
                };
            });
            this.state.categories[courseCategoryIndex].subCategories = subCategories;
            this.setState({ categories: this.state.categories });
        }
        if (this.props.newCategories.items.length > 0) {
            const newCategoryIndex = this.state.categories.findIndex(item => {
                return item.key === "news";
            });
            const subCategories = this.props.newCategories.items.map(item => {
                return {
                    name: item.name,
                    linkHref: `/blog/blog?categorySlug=${item.slug}`,
                    linkAs: `/${item.slug}`
                };
            });
            this.state.categories[newCategoryIndex].subCategories = subCategories;
            this.setState({ categories: this.state.categories });
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (
            prevProps.courses.items.length === 0 &&
            this.props.courses.items.length > 0
        ) {
            const courseCategoryIndex = this.state.categories.findIndex(item => {
                return item.key === "course";
            });
            const subCategories = this.props.courses.items.map(item => {
                return {
                    name: item.name,
                    linkHref: `/course/course?slug=${item.slug}`,
                    linkAs: `/khoa-hoc/${item.slug}`
                };
            });
            this.state.categories[courseCategoryIndex].subCategories = subCategories;
            this.setState({ categories: this.state.categories });
        }
        if (
            prevProps.newCategories.items.length === 0 &&
            this.props.newCategories.items.length > 0
        ) {
            const newCategoryIndex = this.state.categories.findIndex(item => {
                return item.key === "news";
            });
            const subCategories = this.props.newCategories.items.map(item => {
                return {
                    name: item.name,
                    linkHref: `/blog/blog?categorySlug=${item.slug}`,
                    linkAs: `/${item.slug}`
                };
            });
            this.state.categories[newCategoryIndex].subCategories = subCategories;
            this.setState({ categories: this.state.categories });
        }
    }
    handleInputForm(name, value) {
        this.state.formData[name] = value;
        this.setState({ formData: this.state.formData });
    }
    async submitClass(){
        Swal.showLoading();
        let imageLink;
        if (this.state.formData.thumb !== "") {
        imageLink = await api.imgur.uploadImage(this.state.formData.thumb);
        this.state.formData.thumb = imageLink;
        }
        api.news.create(this.state.formData, {
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


                <Head>
                    <title>Thêm bài viết</title>
                    <meta name="title" content="Thêm bài viết" />
                    <meta
                        name="description"
                        content="Thêm lớp học tại trung tâm Yoga Hiệp Hòa"
                    />
                </Head>

                <React.Fragment>
                    <div className="background-overlay"></div>
                    <div className="add-post__header">
                        <HeaderAdmin
                            sidebar={this.state.categories}
                            headerAdmin={this.state.headerAdmin}
                        ></HeaderAdmin>
                    </div>
                    <div className="add-post__sidebar">
                        <Sidebar sidebar={this.state.categories}></Sidebar>
                    </div>
                    <div className="add-post__body">
                        <div className="add-post__body__card">
                            <div className="add-post__body__card__title">Thêm bài viết</div>
                            <div className="add-post__body__card__content">

                                <div
                     
                      className="add-post__body__card__content__info animated
                      fadeIn"
                    >
                      <AddPostForm handleChange={this.handleInputForm} categories={this.props.newCategories.items}/>
                    </div>

                            </div>
                            <div className="add-post__body__card__buttons">
                                <button
                                    className="add-post__body__card__buttons__btn add-post__body__card__buttons__btn-previous"

                                >
                                   Lưu nháp
                    </button>
                                <button
                                    className="add-post__body__card__buttons__btn add-post__body__card__buttons__btn-next"
                                    onClick={this.submitClass}
                                >
                                    Đăng
                                </button>
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return state;
};


const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            fetchCategory: action.newCategory.fetch
        },
        dispatch
    );


export default connect(mapStateToProps, mapDispatchToProps)(AddPost);

import React, { Component } from "react";
import * as moment from 'moment'

import Head from "next/head";
import Link from "next/link";
import Router from 'next/router'
import { connect } from "react-redux";
import { api } from "../../../services";
import { action } from "../../../actions";

import { bindActionCreators } from 'redux'

import "./member.scss";
import {
    HeaderAdmin,
    Sidebar,
    AdminSidebar,
    SwitchRouter
} from "../../../components";

import { MainMember } from './main/main'
import { AddMember } from './add/add'
import { DetailMember } from './detail/detail'

class Member extends Component {
    constructor(props) {
        super(props);
        this.state = {
            headerAdmin: {
                avatar:
                    "https://cdn1.iconfinder.com/data/icons/avatars-1-5/136/87-512.png",
                name: "Avril Lavigne"
            },
            number: null
        };
    }

    static async getInitialProps({ req, query }) {

        return {
            number: Math.random()
        }
    }
    componentDidMount() {
        this.fetchData()
    }
    fetchData() {
        this.props.fetchStudent({
            query: {
                limit: 0
            },
            headers: {
                "x-token":
                    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYWRtaW4iLCJfaWQiOiI1ZDQ4ZWM1ZmFiMGRhYTlkMmM0MDgwYzgiLCJleHBpcmVkQXQiOiIyMDE5LTA4LTI1VDIzOjE0OjA3KzA3OjAwIn0.ngV8I2vD652qTIwum2F4lTEx1brQ8TABgiOmVfY7v8M"
            }
        })
        this.props.fetchCourse({
            query: {
                limit: 0
            }
        })
        this.props.fetchPackage({
            query: {
                limit: 0
            }
        })
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ number: Math.random() })
    }
    async checkUserAlreadyLogin() {
        const userType = localStorage.getItem("ut")
        const tokenExpiredAt = localStorage.getItem("exp")
        if (!userType || !tokenExpiredAt || moment(tokenExpiredAt).isBefore(moment()) || userType !== "admin") {
            Router.push("/dang-nhap/admin")
        }
    }
    render() {
        this.checkUserAlreadyLogin()
        return (
            <div className="manager">
                <Head>
                    <title>Quản lý học viên</title>
                    <meta name="robots" content="noindex" />
                    <meta name="title" content="Quản lý lơp học" />
                    <meta
                        name="description"
                        content="Thêm khóa học tại trung tâm Yoga Hiệp Hòa"
                    />
                </Head>

                <React.Fragment>
                    <div className="background-overlay"></div>
                    <div className="manager__header">
                        <HeaderAdmin
                            headerAdmin={this.state.headerAdmin}
                        ></HeaderAdmin>
                    </div>
                    <div className="manager__sidebar">
                        <AdminSidebar />
                    </div>
                    <div className="manager__body">
                        <div key={this.state.number}>
                            <SwitchRouter routes={
                                [
                                    { path: "/quan-ly/hoc-vien", component: <MainMember {...this.props} /> },
                                    { path: "/quan-ly/hoc-vien/them", component: <AddMember {...this.props} /> },
                                    { path: "/quan-ly/hoc-vien/chi-tiet/:studentId", component: <DetailMember {...this.props} /> }
                                ]
                            } />
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

const mapDispatchToProps = dispatch => {
    return {
        dispatch, ...bindActionCreators(
            {
                fetchStudent: action.student.fetch,
                fetchCourse: action.course.fetch,
                fetchPackage: action.package.fetch,

            },
            dispatch
        )
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Member);

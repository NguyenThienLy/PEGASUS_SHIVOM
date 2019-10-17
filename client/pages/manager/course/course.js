import React, { Component } from "react";
import * as moment from 'moment'

import Head from "next/head";
import Link from "next/link";
import Router from "next/router"
import { connect } from "react-redux";
import { api } from "../../../services";
import { action } from "../../../actions";
import { bindActionCreators } from 'redux'

import "./course.scss";
import {
    HeaderAdmin,
    Sidebar,
    AdminSidebar,
    SwitchRouter
} from "../../../components";

import { MainCourse } from './main/main'
import { AddCourse } from './add/add'
import { DetailCourse } from './detail/detail'

class Course extends Component {
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
        this.checkUserAlreadyLogin()
        this.fetchData()
    }
    fetchData() {
        this.props.fetchCourse({
            query: {
                limit: 0
            },
            headers: {
                "x-token":
                    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYWRtaW4iLCJfaWQiOiI1ZDQ4ZWM1ZmFiMGRhYTlkMmM0MDgwYzgiLCJleHBpcmVkQXQiOiIyMDE5LTA4LTI1VDIzOjE0OjA3KzA3OjAwIn0.ngV8I2vD652qTIwum2F4lTEx1brQ8TABgiOmVfY7v8M"
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

        return (
            <div className="manager">
                <Head>
                    <title>Quản lý khoá học</title>
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
                            sidebar={this.state.categories}
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
                                    { path: "/quan-ly/khoa-hoc", component: <MainCourse {...this.props} /> },
                                    { path: "/quan-ly/khoa-hoc/them", component: <AddCourse /> },
                                    { path: "/quan-ly/khoa-hoc/chi-tiet/:courseId", component: <DetailCourse {...this.props} /> }
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

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            fetchCourse: action.course.fetch,
            fetchLineChart: action.statisticCourse.fetchForLineChart,
            fetchPieChart: action.statisticCourse.fetchForPieChart,
            fetchColumnChart: action.student.fetchForColumnChart,
            fetchListDetail: action.statisticStudent.fetchForListDetail
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(Course);

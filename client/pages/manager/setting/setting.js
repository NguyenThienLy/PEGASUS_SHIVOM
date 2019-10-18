import React, { Component } from "react";
import * as moment from 'moment'
import Head from "next/head";
import Link from "next/link";
import Router from "next/router"
import { connect } from "react-redux";
import { api } from "../../../services";
import { action } from "../../../actions";

import { bindActionCreators } from 'redux';

import "./setting.scss";
import {
    HeaderAdmin,
    Sidebar,
    AdminSidebar,
    SwitchRouter
} from "../../../components";

import { MainSetting } from './main/main'

class Setting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            headerAdmin: {
                avatar:
                    "https://cdn1.iconfinder.com/data/icons/avatars-1-5/136/87-512.png",
                name: "Avril Lavigne"
            }
        };
        this.fetchData = this.fetchData.bind(this)
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
        if (!this.props.setting.fetched) {
            this.props.fetchSetting({
                query: {
                    filter: {
                        status: "active"
                    }
                }
            });
        }
    }
    async checkUserAlreadyLogin() {
        const userType = localStorage.getItem("ut")
        const tokenExpiredAt = localStorage.getItem("exp")
        if (!userType || !tokenExpiredAt || moment(tokenExpiredAt).isBefore(moment()) || userType !== "admin") {
            Router.push("/dang-nhap/admin")
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ number: Math.random() })
    }
    render() {

        return (
            <div className="manager">
                <Head>
                    <title>Thiết lập website</title>
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
                                    { path: "/quan-ly/thiet-lap", component: <MainSetting {...this.props} /> },

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
                fetchSetting: action.setting.fetch
            },
            dispatch
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Setting);

import React, { Component } from "react";

import Head from "next/head";
import Link from "next/link";
import { connect } from "react-redux";
import { api } from "../../../services";
import { action } from "../../../actions";

import "./class.scss";
import {
    HeaderAdmin,
    Sidebar,
    AdminSidebar,
    SwitchRouter
} from "../../../components";

import { MainClass } from './main/main';
import { AddClass } from './add/add';
import { EditClass } from './edit/edit';

class Class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            headerAdmin: {
                avatar:
                    "https://cdn1.iconfinder.com/data/icons/avatars-1-5/136/87-512.png",
                name: "Avril Lavigne"
            },
            pathname: null
        };
    }

    static async getInitialProps({ req, query }) {
        return {
            number: Math.random()
        }
        // if (req) {
        //     return {
        //         pathname: req._parsedOriginalUrl.pathname
        //     }
        // }
        // else {

        //     return {
        //         location: window.location.pathname
        //     }
        // }
    }
    render() {
        return (
            <div className="class">
                <Head>
                    <title>Quản lý lớp học</title>
                    <meta name="robots" content="noindex" />
                    <meta name="title" content="Quản lý lơp học" />
                    <meta
                        name="description"
                        content="Thêm khóa học tại trung tâm Yoga Hiệp Hòa"
                    />
                </Head>

                <React.Fragment>
                    <div className="background-overlay"></div>
                    <div className="class__header">
                        <HeaderAdmin
                            sidebar={this.state.categories}
                            headerAdmin={this.state.headerAdmin}
                        ></HeaderAdmin>
                    </div>
                    <div className="class__sidebar">
                        <AdminSidebar />
                    </div>
                    <div className="class__body">
                        <div>
                            <SwitchRouter routes={
                                [
                                    { path: "/quan-ly/lop-hoc", component: <MainClass /> },
                                    { path: "/quan-ly/lop-hoc/them", component: <AddClass greeting="Xin chào" /> },
                                    { path: "/quan-ly/lop-hoc/sua", component: <EditClass /> }
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

export default connect(mapStateToProps)(Class);

import React, { Component } from 'react'

import Head from 'next/head'
import Link from 'next/link'
import { connect } from 'react-redux'
import { api } from '../../services'
import { action } from '../../actions'

import './project.scss'
import {
    Header,
    Footer,
    Activity,
    Alert,
    StudentInfo,
    AddStudent,
    CourseOptions,
} from '../../components/'
import { StudentAction } from '../../actions/student'

class Project extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activities: [
                {
                    time: '23 phút',
                    content: 'has change password has change password',
                },
                {
                    time: '24 phút',
                    content: 'has change password aaa has change password',
                }
            ]
        };
    }
    static async getInitialProps({ req, query }) {

        return {

        }
    }

    async componentDidMount() {
        var heightOfFooter = $(".project-footer .footer-wrapper").height();
        $(".project__body").css("margin-bottom", heightOfFooter + "px");

    }
    render() {
        return (
            <div>
                <Head>
                    <title>Dự án</title>
                    <meta name="title" content="Dự án tại Pegasus" />
                    <meta name="description" content="Các dự án của Pegasus" />
                </Head>
                <Header {...this.props} />
                <React.Fragment>
                    <div className="project__body">
                        <Activity activities={this.state.activities} />
                        <Alert type='error' />
                        <Alert type='success' />
                        <Alert type='warn' />
                        <AddStudent />
                        <CourseOptions />
                    </div>
                </React.Fragment>
                <div className="project-footer">
                    <Footer />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return state;
};

export default connect(mapStateToProps)(Project);

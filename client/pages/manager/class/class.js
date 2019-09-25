import React, { Component } from 'react'

import Head from 'next/head'
import Link from 'next/link'
import { connect } from 'react-redux'
import { api } from '../../../services'
import { action } from '../../../actions'

import { Switch, Route } from 'react-router-dom'

import './class.scss'
import { Header, Footer } from '../../../components'
import { MainClass } from './main/main';
import { AddClass } from './add/add';
import { EditClass } from './edit/edit';

class Class extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    static async getInitialProps({ req, query }) {

        return {

        }
    }

    async componentDidMount() {

    }
    render() {

        return (
            <div>
                <Head>
                    <title>Quản lý lớp học</title>
                    <meta name="robots" content="noindex" />
                    <meta name="title" content="Giới thiệu Pegasus" />
                    <meta name="description" content="Công ty công nghệ Pegasus" />
                </Head>
                <Header {...this.props} />
                <React.Fragment>
                    <div className="body">
                        <h1>Giới thiệu team Pegasus</h1>
                    </div>
                    {process.browser ?
                        <Switch>
                            <Route path="/" exact component={MainClass} />
                            <Route path="/quan-ly/lop-hoc/add" component={AddClass} />
                            <Route path="/quan-ly/lop-hoc/edit" component={EditClass} />
                        </Switch> : null}
                </React.Fragment>
                <Footer />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return state;
};

export default connect(mapStateToProps)(Class);

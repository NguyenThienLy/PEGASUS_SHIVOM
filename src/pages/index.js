import * as React from 'react'
import 'isomorphic-unfetch'
import { connect } from 'react-redux'

import Head from 'next/head'
import Router from 'next/router'

import { Header } from '../components'
import { Slide } from '../components'

import '../assets/bootstrap4/bootstrap.min.scss'


import { crudApi } from '../services'

const firebaseAuthentication = require('../authentication/firebase')
class Home extends React.Component {
    constructor(props) {
        super(props)
    }
    static async  getInitialProps({ req, query }) {

        return {

        }
    }
    async componentDidMount() {

    }
    async componentDidMount() {
        const isLogin = await firebaseAuthentication.authenticated
        if (isLogin === false) {
            Router.push("/login")
        }
    }
    async logout() {
        await firebaseAuthentication.signOut()
        Router.push('/login')
        // this.props.dispatch({ type: "LOGIN"})
    }
    render() {
        return (
            <div>
                <Head>
                    <title>Trang chủ</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                    {/* <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN"
                        crossOrigin="anonymous"></script>
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q"
                        crossOrigin="anonymous"></script> */}
                    {/* <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl"
                        crossOrigin="anonymous"></script> */}
                    <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" />


                </Head>
                <Header />
                <div className="home-main">
                    <button onClick={this.logout}>
                        Đăng xuất
                    </button>
                    </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return state;
};

export default connect(mapStateToProps)(Home);


import * as React from 'react'
import 'isomorphic-unfetch'
import { connect } from 'react-redux'


import { Header } from '../../components'
import Head from 'next/head'
import Link from 'next/link'
import Router from 'next/router'
import './login.scss'


const firebaseAuthentication = require('../../authentication/firebase')


 class Login extends React.Component {
    constructor(props) {
        super(props)
        this.login = this.login.bind(this)
    }
    static async  getInitialProps({ req, query }) {
        return {
           
        }
    }
    async login() {
        const isLogin = await firebaseAuthentication.signInWithGoogle()
        console.log("is login: ", isLogin)
        if(isLogin) {
            Router.push('/')
        }
        // this.props.dispatch({ type: "LOGIN"})
    }
  
    render() {
        console.log("login props: ", this.props)
        return (
            <div>
                <Head>
                    <title>Đăng nhập</title>
                </Head>
                <Header/>
                <div className="login-main">
                    <h1>Đăng nhập</h1>
                    <button onClick={this.login}>
                        Đăng nhập
                    </button>
                  
                </div>
                
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return state;
  };
  
  export default connect(mapStateToProps)(Login);


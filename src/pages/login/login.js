import * as React from 'react'
import 'isomorphic-unfetch'
import { connect } from 'react-redux'


import { Header, Loading } from '../../components'
import Head from 'next/head'
import Link from 'next/link'
import Router from 'next/router'
import './login.scss'


const firebaseAuthentication = require('../../authentication/firebase')


class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showLoading: true
        }
        this.login = this.login.bind(this)
        this.onSignUpClick = this.onSignUpClick.bind(this)
        this.onSignInClick = this.onSignInClick.bind(this)
        // this.showLoading = this.showLoading.bind(this)
    }
    static async  getInitialProps({ req, query }) {
        return {
            showLoading: true
        }
    }
    async componentDidMount() {
        const isLogin = await firebaseAuthentication.authenticated

        if (isLogin === true) {
            Router.push("/")
        } else {
            this.setState({ showLoading: false })
        }
    }
    async login() {

    }
    onOpenSignInClick() {
        const container = document.getElementById('container');
        container.classList.remove("right-panel-active");
    }
    onOpenSignUpClick() {
        const container = document.getElementById('container');
        container.classList.add("right-panel-active");
    }
    async onSignInClick(event) {
        event.preventDefault()
        const body = {
            name: this.refs.name.value,
            email: this.refs.emailLogin.value,
            password: this.refs.passwordLogin.value
        }
        try {
            const isLogin = await firebaseAuthentication.signInWithEmailAndPassword(body.email, body.password)
            if (isLogin) {
                Router.push('/')
            } else {
                alert("Đăng nhập không thành công")
            }
        } catch (err) {
            alert("Đăng nhập không thành công")
        }
    }
    async onSignUpClick(event) {
        event.preventDefault()
        const body = {
            name: this.refs.name.value,
            email: this.refs.email.value,
            password: this.refs.password.value
        }
        console.log("body: ", body)
        try {
            const isLogin = await firebaseAuthentication.createUserByEmailAndPassword(body.email, body.password)
            if (isLogin) {
                Router.push('/')
            } else {
                alert("Đăng nhập không thành công")
            }
        } catch (err) {
            alert("Đăng nhập không thành công")
        }
    }

    async loginWithFacebook() {
        try {
            const isLogin = await firebaseAuthentication.signInWithFacebook()
            if (isLogin) {
                Router.push('/')
            } else {
                alert("Đăng nhập không thành công")
            }
        } catch (err) {
            alert("Đăng nhập không thành công")
        }
    }
    async loginWithGoogle() {
        try {
            const isLogin = await firebaseAuthentication.signInWithGoogle()
            if (isLogin) {
                Router.push('/')
            } else {
                alert("Đăng nhập không thành công")
            }
        } catch (err) {
            alert("Đăng nhập không thành công")
        }
    }

    render() {
        return (
            <div>
                <Head>
                    <title>Đăng nhập</title>
                    <link
                        rel="stylesheet"
                        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.7.2/css/all.min.css"
                    />
                </Head>
                {this.state.showLoading ? <Loading /> :
                    <div className="login-main">
                        <div class="container" id="container">
                            <div class="form-container sign-up-container">
                                <form action="#">
                                    <h1>Create Account</h1>
                                    <div class="social-container">
                                        <a href="#" class="social" onClick={this.loginWithFacebook} className="__login-a" ><i class="fab fa-facebook-f"></i></a>
                                        <a href="#" class="social" onClick={this.loginWithGoogle} className="__login-a" ><i class="fab fa-google-plus-g"></i></a>
                                        <a href="#" class="social" className="__login-a"><i class="fab fa-instagram" ></i></a>
                                    </div>
                                    <span>or use your email for registration</span>
                                    <input type="text" placeholder="Name" name="name" ref="name" className="__login-input" />
                                    <input type="email" placeholder="Email" name="email" ref="email" className="__login-input" />
                                    <input type="password" placeholder="Password" name="password" ref="password" className="__login-input" />
                                    <button onClick={this.onSignUpClick} className="__login-button">Sign Up</button>
                                </form>
                            </div>
                            <div class="form-container sign-in-container">
                                <form action="#">
                                    <h1>Sign in</h1>
                                    <div class="social-container">
                                        <a href="#" class="social" onClick={this.loginWithFacebook} className="__login-a"><i class="fab fa-facebook-f"></i></a>
                                        <a href="#" class="social" onClick={this.loginWithGoogle} className="__login-a"><i class="fab fa-google-plus-g"></i></a>
                                        <a href="#" class="social" className="__login-a"><i class="fab fa-instagram" ></i></a>
                                    </div>
                                    <span>or use your account</span>
                                    <input type="email" placeholder="Email" ref="emailLogin" className="__login-input" />
                                    <input type="password" placeholder="Password" ref="passwordLogin" className="__login-input" />
                                    <a href="#" className="__login-a">Forgot your password?</a>
                                    <button onClick={this.onSignInClick} className="__login-button">Sign In</button>
                                </form>
                            </div>
                            <div class="overlay-container">
                                <div class="overlay">
                                    <div class="overlay-panel overlay-left">
                                        <h1>Welcome Back!</h1>
                                        <p>
                                            To keep connected with us please login with your personal info
            </p>
                                        <button id="signIn" onClick={this.onOpenSignInClick} className="__login-button ghost">Sign In</button>
                                    </div>
                                    <div class="overlay-panel overlay-right">
                                        <h1>Hello, Friend!</h1>
                                        <p>Enter your personal details and start journey with us</p>
                                        <button id="signUp" onClick={this.onOpenSignUpClick} className="__login-button ghost">Sign Up</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                }

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return state;
};

export default connect(mapStateToProps)(Login);


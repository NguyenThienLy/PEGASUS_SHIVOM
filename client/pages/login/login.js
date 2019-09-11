import * as React from "react";
import Head from "next/head";
import Link from "next/link";
import Router from "next/router"
import { connect } from "react-redux";
import { api } from "../../services";
import { action } from "../../actions";
import { bindActionCreators } from 'redux'

import "./login.scss";
import { Header, Footer } from "../../components";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    // this.onLoginClick = this.onLoginClick.bind(this);
    this.signup = this.signup.bind(this)
    this.login = this.login.bind(this)
    this.checkUserLogin = this.checkUserLogin.bind(this)
  }
  static async getInitialProps({ req, query }) {
    console.log("type: ", query.type)
    return { type: query.type };
  }
  checkUserLogin() {
    if (this.props.type === "student" && this.props.studentAccount.login.isLogon) {
      Router.push("/")
    } else if (this.props.type === "admin" && this.props.admin.login.isLogon) {
      Router.push("/tong-quan")
    }
  }
  async componentDidMount() {
    this.checkUserLogin()
    const loginBtn = document.getElementById("login");
    const signupBtn = document.getElementById("signup");

    loginBtn.addEventListener("click", e => {
      let parent = e.target.parentNode.parentNode;
      Array.from(e.target.parentNode.parentNode.classList).find(element => {
        if (element !== "slide-up") {
          parent.classList.add("slide-up");
        } else {
          signupBtn.parentNode.classList.add("slide-up");
          parent.classList.remove("slide-up");
        }
      });
    });

    signupBtn.addEventListener("click", e => {
      let parent = e.target.parentNode;
      Array.from(e.target.parentNode.classList).find(element => {
        if (element !== "slide-up") {
          parent.classList.add("slide-up");
        } else {
          loginBtn.parentNode.parentNode.classList.add("slide-up");
          parent.classList.remove("slide-up");
        }
      });
    });
  }
  //   onLoginClick() {
  //     const loginBtn = document.getElementById("login");
  //     loginBtn.addEventListener("click", e => {
  //       let parent = e.target.parentNode.parentNode;
  //       Array.from(e.target.parentNode.parentNode.classList).find(element => {
  //         if (element !== "slide-up") {
  //           parent.classList.add("slide-up");
  //         } else {
  //           signupBtn.parentNode.classList.add("slide-up");
  //           parent.classList.remove("slide-up");
  //         }
  //       });
  //     });
  //   }
  signup() {

  }
  login() {

    if (this.props.type === "student") {
      this.props.studentLogin(this.refs.phone.value, this.refs.password.value)
    } else if (this.props.type === "admin") {
      this.props.adminLogin(this.refs.username.value, this.refs.password.value)
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props.admin.login.isLogon && prevProps.admin.login.isLogon === false) {
      console.log("Đăng nhập thành công")
      Router.push("/tong-quan")
    }
    if (this.props.admin.login.isError && prevProps.admin.login.isPending) {
      console.log("Co loi xay ra")
      alert("Đăng nhập không thành công")
      this.props.clearAdminLogin()
    }
  }
  render() {
    console.log("login page props: ", this.props.admin)
    return (
      <div className="login-page">
        <Head>
          <title>Login</title>
          <meta name="title" content="Login" />
          <meta name="description" content="Trang đăng nhập" />
        </Head>

        <React.Fragment>
          <div className="form-structor">
            <div className="signup">
              <h2 className="form-title" id="signup">
                Đăng ký
              </h2>
              <div className="form-holder">
                <input type="text" className="input" placeholder="Tên" ref="name" />
                <input type="email" className="input" placeholder="Email" ref="email" />
                <input
                  type="password"
                  className="input"
                  placeholder="Mật khẩu"
                />
              </div>
              <button className="submit-btn" onClick={this.signup}>Đăng ký</button>
            </div>
            <div className="login slide-up">
              <div className="center">
                <h2
                  className="form-title"
                  id="login"
                //   onClick={this.onLoginClick}
                >
                  Đăng nhập
                </h2>
                <div className="form-holder">
                  <input type="text" className="input" placeholder="Tên đăng nhập" ref="username" />
                  <input
                    type="password"
                    className="input"
                    placeholder="Mật khẩu"
                    ref="password"
                  />
                </div>
                <button className="submit-btn" onClick={this.login}>Đăng nhập</button>
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
      adminLogin: action.admin.login,
      studentLogin: action.studentAccount.login,
      clearAdminLogin: action.admin.loginClear
    },
    dispatch
  );


export default connect(mapStateToProps, mapDispatchToProps)(Login);

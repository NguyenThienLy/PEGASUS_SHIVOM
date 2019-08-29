import * as React from "react";
import Head from "next/head";
import Link from "next/link";
import { connect } from "react-redux";
import { api } from "../../services";
import { action } from "../../actions";

import "./login.scss";
import { Header, Footer } from "../../components";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  static async getInitialProps({ req, query }) {
    return {};
  }

  async componentDidMount() {
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

  render() {
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
                <input type="text" className="input" placeholder="Tên" />
                <input type="email" className="input" placeholder="Email" />
                <input
                  type="password"
                  className="input"
                  placeholder="Mật khẩu"
                />
              </div>
              <button className="submit-btn">Đăng ký</button>
            </div>
            <div className="login slide-up">
              <div className="center">
                <h2 className="form-title" id="login">
                  Đăng nhập
                </h2>
                <div className="form-holder">
                  <input type="email" className="input" placeholder="Email" />
                  <input
                    type="password"
                    className="input"
                    placeholder="Mật khẩu"
                  />
                </div>
                <button className="submit-btn">Đăng nhập</button>
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

export default connect(mapStateToProps)(Login);

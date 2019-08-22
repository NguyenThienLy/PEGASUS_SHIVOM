import * as React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { connect } from 'react-redux'
import { api } from '../../services'
import { action } from '../../actions';

import './login.scss'
import { Header, Footer } from '../../components'

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            
        }
    }
    static async getInitialProps({ req, query }) {
        return {

        }
    }

    async componentDidMount() {
        
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
                        <h2 className="form-title" id="signup"><span>hoặc</span>Đăng ký</h2>
                        <div className="form-holder">
                            <input type="text" className="input" placeholder="Tên" />
                            <input type="email" className="input" placeholder="Email" />
                            <input type="password" className="input" placeholder="Mật khẩu" />
                        </div>
                        <button className="submit-btn">Đăng ký</button>
                    </div>
                    <div className="login slide-up">
                        <div className="center">
                            <h2 className="form-title" id="login"><span>hoặc</span>Đăng nhập</h2>
                            < div className = "form-holder" >
                                <input type="email" className="input" placeholder="Email" />
                                <input type="password" className="input" placeholder="Mật khẩu" />
                            </div>
                            <button className="submit-btn">Log in</button>
                        </div>
                    </div>
                </div>

                </React.Fragment>
               
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return state;
};

export default connect(mapStateToProps)(Login);


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
            <div>
                <Head>
                    <title>Login</title>
                    <meta name="title" content="Login" />
                    <meta name="description" content="Trang đăng nhập" />
                </Head>
                
                <React.Fragment>
                
                <div className="form-structor">
                    <div className="signup">
                        <h2 className="form-title" id="signup"><span>or</span>Sign up</h2>
                        <div className="form-holder">
                            <input type="text" className="input" placeholder="Name" />
                            <input type="email" className="input" placeholder="Email" />
                            <input type="password" className="input" placeholder="Password" />
                        </div>
                        <button className="submit-btn">Sign up</button>
                    </div>
                    <div className="login slide-up">
                        <div className="center">
                            <h2 className="form-title" id="login"><span>or</span>Log in</h2>
                            < div className = "form-holder" >
                                <input type="email" className="input" placeholder="Email" />
                                <input type="password" className="input" placeholder="Password" />
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


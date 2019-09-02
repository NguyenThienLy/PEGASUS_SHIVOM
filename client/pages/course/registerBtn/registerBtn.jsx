import * as React from 'react'
import './registerBtn.scss'

export class RegisterBtn extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <button className="register-btn">đăng ký ngay</button>
        )
    }
}
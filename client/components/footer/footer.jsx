import * as React from 'react'
import './footer.scss'

import Link from 'next/link'

import Head from 'next/head'

export class Footer extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="footer-wrapper">
                <div className="footer-wrapper__first-floor">
                    <div className="footer-wrapper__first-floor__logo"></div>
                    <div className="footer-wrapper__first-floor__contact"></div>
                    <div className="footer-wrapper__first-floor__social-group"></div>
                    <div className="footer-wrapper__first-floor__email-regis"></div>
                </div>
                <hr className="footer-wrapper__divider"/>
                <div className="footer-wrapper__second-floor">
                    <a href="#" className="footer-wrapper__second-floor__item">Trang chủ</a>
                    <a href="#" className="footer-wrapper__second-floor__item">Khoá học</a>
                    <a href="#" className="footer-wrapper__second-floor__item">Tin tức</a>
                    <a href="#" className="footer-wrapper__second-floor__item">Về chúng tôi</a>
                </div>
            </div>
        )
    }
}

export default Footer
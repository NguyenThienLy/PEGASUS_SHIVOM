import * as React from 'react'
import './../../assets/bootstrap4/bootstrap.min.scss'
import './footer.scss'

import Link from 'next/link'

import Head from 'next/head'

export class Footer extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="footer">
            <div className="footer-wrapper">
                <div className="content-list">
                    <a href="#" className="content-items">About Us</a>
                    <a href="#" className="content-items">Contact</a>
                    <a href="#" className="content-items">Privacy</a>
                    <a href="#" className="content-items">Terms</a>
                    <a href="#" className="content-items">Help</a>                    
                </div>
                <div className="footer-copyright">
                    <h5>cuongsach.com 2019© All rights reserved. Powered by Pegasus Tech</h5>
                </div>
                
            </div>
            </div>
        )
    }
}


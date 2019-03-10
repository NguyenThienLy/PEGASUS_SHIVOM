import * as React from 'react'

import { Header } from '../../components'

import Head from 'next/head'

import './contact.scss'

export default class Contact extends React.Component {
    constructor(props) {
        super(props)
    }
    static async  getInitialProps({ req, query }) {
        return {
          
        }
    }
    render() {
        return (
            <div>
                <Head>
                    <title>Liên hệ</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                </Head>
                <Header />
                <div>Liên hệ</div>
            </div>
        )
    }
}
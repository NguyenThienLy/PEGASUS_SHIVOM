import * as React from 'react'
import 'isomorphic-unfetch'
import { connect } from 'react-redux'
import { Header } from '../../components'
import Head from 'next/head'
import Link from 'next/link'
import './books.scss'

import { Ranks } from './components/ranks/ranks'

class Books extends React.Component {
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
                    <title>Danh sách sách</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.2.0/css/all.css" integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ"
                        crossorigin="anonymous"></link>
                </Head>
                <Header />
                <div className="books-main">
                    <div className="books-overview">
                        <div id="books-overview-list"></div>
                        <div id="books-overview-ranks">
                            <Ranks />
                        </div>

                    </div>

                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return state;
};

export default connect(mapStateToProps)(Books);


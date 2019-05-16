import * as React from 'react'
import 'isomorphic-unfetch'
import { connect } from 'react-redux'

import { Header, Headline } from '../../components'
import Head from 'next/head'
import Link from 'next/link'
import './book.scss'

import { BookInfo } from './components/info/info'
import { Reviews } from './components/reviews/reviews'

class Book extends React.Component {
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
                    <title>Chi tiết sách</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                    <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" />
                    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.2.0/css/all.css" integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ"
                        crossorigin="anonymous"></link>
                </Head>
                <Header {...this.props}/>
                <div className="book-main">
                    <BookInfo />
                    <div style={
                        {
                            height: "30px"
                        }
                    }></div>
                    <Headline title="Bài viết xem nhiều nhất" switchPage={true} />
                    <div style={
                        {
                            height: "18px"
                        }
                    }></div>
                    <Reviews/>
                    <div style={
                        {
                            height: "30px"
                        }
                    }></div>
                    <Headline title="Bài viết mới nhất" switchPage={true} />
                    <div style={
                        {
                            height: "18px"
                        }
                    }></div>
                    <Reviews/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return state;
};

export default connect(mapStateToProps)(Book);


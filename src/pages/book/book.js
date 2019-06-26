import * as React from 'react'
import 'isomorphic-unfetch'
import { connect } from 'react-redux'

import { Header, Headline } from '../../components'
import Head from 'next/head'
import Link from 'next/link'
import './book.scss'

import { BookInfo } from './components/info/info'
import { Reviews } from './components/reviews/reviews'

import { api } from '../../services'

class Book extends React.Component {
    constructor(props) {
        super(props)
    }
    static async  getInitialProps({ req, query }) {
        const bookId = query.bookId
        let book = {}
        book = await api.book.getItem(bookId, {
            query: {
                fields:["$all", { "author": ["name","avatar","_id"]}, { "category":["name"]}],

            }
        })
        return {
            book
        }
    }
    render() {

        return (
            <div>
                <Head>
                    <title>{this.props.book.title}</title>
                  
                   
                </Head>
                <Header {...this.props}/>
                <div className="book-main">
                    <BookInfo {...this.props.book}/>
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


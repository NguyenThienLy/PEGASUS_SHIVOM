import * as React from 'react'
import 'isomorphic-unfetch'
import { connect } from 'react-redux'
import {
    Switch,
    Route,
    Redirect,
    NavLink
} from 'react-router-dom';

import { Header, Headline, CustomRouter, CustomLink, Footer } from '../../components'
import Head from 'next/head'
import './books.scss'

import { Ranks } from './components/ranks/ranks'
import { TopBooks } from './components/topBooks/topBook'
import { NewestBooks } from './components/newestBooks/newestBook'

import { booksRoutes } from './books.routes'

class Books extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            nestedPath: "/newest"
        }
        this.changeNestedPath = this.changeNestedPath.bind(this)
    }
    static async  getInitialProps({ req, query }) {
        return {

        }
    }
    changeNestedPath(path) {
        this.setState({ nestedPath: path })
    }
    render() {
        return (
            <div>
                <Head>
                    <title>Danh sách sách</title>
                    
                </Head>
                <Header {...this.props}/>
                {/* <ul className="nav">
                    {
                        booksRoutes.map((prop, key) => {
                            return (
                                <li key={key}>
                                    <CustomLink changePath={() => { this.changeNestedPath(prop.path) }}>{prop.name}</CustomLink>
                                </li>
                            );
                        })
                    }
                </ul> */}
                <div className="books-main">
                    {/* <CustomRouter routes={booksRoutes} path={this.state.nestedPath} /> */}
                    <div className="books-overview">
                        <div id="books-overview-list">
                            <TopBooks/>
                        </div>
                        <div id="books-overview-ranks">
                            <Ranks />
                        </div>
                    </div>
                    <Headline title="Sách mới nhất" switchPage={true}/>
                    <NewestBooks/>
                    <Headline title="Phổ biến nhất" switchPage={true}/>
                    <NewestBooks/>
                </div>
                <Footer/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return state;
};

export default connect(mapStateToProps)(Books);


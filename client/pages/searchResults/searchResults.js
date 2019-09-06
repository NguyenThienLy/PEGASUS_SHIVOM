import React, { Component } from 'react'

import Head from 'next/head'
import Link from 'next/link'
import { connect } from 'react-redux'
import { api } from '../../services'
import { action } from '../../actions'

import './searchResults.scss'
import {
    Header,
    Footer,
    SearchBox,
} from '../../components/'

class SearchResults extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    static async getInitialProps({ req, query }) {

        return {

        }
    }

    async componentDidMount() {
        var heightOfFooter = $(".search-page__footer .footer-wrapper").height();
        $(".search-page__wrapper__results").css("margin-bottom", heightOfFooter + "px");
    }
    render() {
        return (
            <div className="search-page">
                <Head>
                    <title>Kết quả tìm kiếm</title>
                    <meta name="title" content="Kết quả tìm kiếm" />
                    <meta name="description" content="Các dự án của Pegasus" />
                </Head>
                <Header {...this.props} />
                <React.Fragment>
                    <div className="search-page__path">
                        <span>Kết quả tìm kiếm cho: asdasd</span>
                    </div>
                    <div className="search-page__wrapper">
                        <form className="search-page__wrapper__form">
                            <div className="search-page__wrapper__form__text">Tìm Kiếm: </div>
                            <div className="search-page__wrapper__form__search">
                                <SearchBox type='search' />
                            </div>
                            <div className="search-page__wrapper__form__small-text">
                                <span>Nếu không có kết quả nào phù hợp, hãy thử với từ khoá khác nhé </span>😊
                            </div>
                        </form>
                        <div className="search-page__wrapper__results">

                        </div>
                    </div>
                </React.Fragment>
                <div className="search-page__footer">
                    <Footer />
                </div>

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return state;
};

export default connect(mapStateToProps)(SearchResults);

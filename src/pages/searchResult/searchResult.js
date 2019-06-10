import * as React from "react";
import "isomorphic-unfetch";
import { connect } from "react-redux";
import { Header, Headline, Footer, CloudImage } from "../../components";
import Head from "next/head";
import Link from "next/link";
import "./searchResult.scss";
import { api } from '../../services'



class SearchResult extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: null,
            type: "post",
            results: []
        }
    }
    static async getInitialProps({ req, query }) {
        const search = req.query.search || ""
        return {
            search
        };
    }
    async componentDidMount() {
        this.setState({ search: this.props.search })
        try {
            const results = await api.search.search({
                keyword: this.props.search,
                type: "post"
            })
            this.setState({ results: results.hits })

        } catch (err) {

        }
    }
    changeSearchType = async (type) => {
        await this.setState({ type, results: [] })
        try {
            const results = await api.search.search({
                keyword: this.state.search,
                type: type
            })
            this.setState({ results: results.hits })
        } catch (err) {
            console.log('err: ', err)
        }
    }
    onSearch = async () => {
        this.setState({ search: this.refs.search.value })
    }
    onSearchKeyPress = async (event) => {
        try {
            const results = await api.search.search({
                keyword: this.state.search,
                type: this.state.type
            })
            this.setState({ results: results.hits })
        } catch (err) {
            console.log('err: ', err)
        }
    }
    openPost(slug) {
        window.open(`http://localhost:3000/bai-viet/${slug}`,"_self")
    }


    render() {
        return (
            <div>
                <Head>
                    <title>Kết quả tìm kiếm</title>
                    <meta content="width=device-width, initial-scale=1" name="viewport" />

                </Head>
                <Header {...this.props} />

                <div className="search-page">
                    <div className="search-content">
                        <div className="search-box">
                            <input className="search-txt" type="text" name="search-box" placeholder="Tìm kiếm..." defaultValue={this.state.search} ref="search" onChange={this.onSearch} onKeyPress={this.onSearchKeyPress} />
                            <a className="search-icon" href="#" onClick={this.onSearchKeyPress}>
                                <i className="fas fa-search"></i>
                            </a>
                        </div>
                        <div>
                            <ul className="search-navbar">
                                <li className={`search-navbar-item ${this.state.type === "post" ? "active" : null}`} onClick={() => { return this.changeSearchType("post") }}><a href="#">Bài viết đánh giá</a></li>
                                <li className={`search-navbar-item ${this.state.type === "user" ? "active" : null}`} onClick={() => { return this.changeSearchType("user") }}><a href="#">Reviewer</a></li>
                                <li className={`search-navbar-item ${this.state.type === "book" ? "active" : null}`} onClick={() => { return this.changeSearchType("book") }}><a href="#">Sách</a></li>
                                <li className={`search-navbar-item ${this.state.type === "author" ? "active" : null}`} onClick={() => { return this.changeSearchType("author") }}><a href="#">Tác giả</a></li>
                                <li className={`search-navbar-item ${this.state.type === "motsach" ? "active" : null}`} onClick={() => { return this.changeSearchType("motsach") }}><a href="#">Góc mọt sách</a></li>
                            </ul>
                        </div>

                        <div className="search-result-container">
                            <div className="search-result-top">
                                <div className="search-result-top-title">Kết quả</div>
                                <div className="search-result-top-items">

                                    <select className="select-css">
                                        <option value="10" selected>10 kết quả / trang</option>
                                        <option value="15">15 kết quả / trang</option>
                                        <option value="20">20 kết quả / trang</option>
                                        <option value="25">25 kết quả / trang</option>
                                    </select>

                                    <select className="select-css">
                                        <option value="rating htl" selected>Đánh giá (cao đến thấp)</option>
                                        <option value="rating lth">Đánh giá (thấp đến cao)</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div>

                            {
                                this.state.results.length > 0 ?
                                    <div>
                                        {this.state.results.map((result, index) => {
                     
                                            switch (this.state.type) {
                                                case "book":
                                                    return (
                                                        <div key={index}>
                                                            <div className="__search-result">
                                                                <div className="image-wrapper">
                                                                    <CloudImage src={result._source.thumb} />
                                                                </div>
                                                                <div className="info">
                                                                <Link as={`/sach/${result._id}`} href={`/book/book?bookId=${result._id}`}>
                                                                    <h3 dangerouslySetInnerHTML={{ __html: this.state.results[index].highlight.title[0] }} ></h3>
                                                                    </Link>
                                                                    <p>Tạ Minh Tuấn</p>
                                                                </div>
                                                            </div>
                                                            <hr />
                                                        </div>
                                                    )
                                                case "author":
                                                    return (
                                                        <div key={index}>
                                                            <div className="__search-result">
                                                                <div className="image-wrapper">
                                                                    <CloudImage src={result._source.avatar} />
                                                                </div>
                                                                <div className="info">
                                                                    <h3 dangerouslySetInnerHTML={{ __html: this.state.results[index].highlight.name[0] }} ></h3>
                                                                    <p>{result._source.biography}</p>
                                                                </div>
                                                            </div>
                                                            <hr />
                                                        </div>
                                                    )
                                                case "user":
                                                    return (
                                                        <div>
                                                            Không có kết quả
                                                        </div>
                                                    )
                                                case "post":
                                                    return (

                                                        <div key={index}>
                                                            <div className="__search-result">
                                                                <div className="image-wrapper">
                                                                    <CloudImage src={result._source.thumb} />
                                                                </div>
                                                                <div className="info">
                                                                    <h3 dangerouslySetInnerHTML={{ __html: this.state.results[index].highlight.title[0] }} onClick={() => { return this.openPost(result._source.slug) }} ></h3>
                                                                    <p>{result._source.author}</p>
                                                                </div>
                                                            </div>
                                                            <hr />
                                                        </div>

                                                    )
                                            }

                                        })}
                                    </div> :
                                    <div>
                                        Không có kết quả
                                     </div>
                            }
                        </div>
                        <div className="pagination__wrapper">
                            <ul className="pagination">
                                <li><button className="prev" title="previous page">&#10094;</button></li>
                                <li>
                                    <button title="first page - page 1">1</button>
                                </li>
                                <li>
                                    <span>...</span>
                                </li>
                                <li>
                                    <button title="page 8">8</button>
                                </li>
                                <li>
                                    <button className="active" title="current page - page 9">9</button>
                                </li>
                                <li>
                                    <button title="page 10">10</button>
                                </li>
                                <li>
                                    <span>...</span>
                                </li>
                                <li>
                                    <button title="last page - page 69">69</button>
                                </li>
                                <li><button className="next" title="next page">&#10095;</button></li>
                            </ul>
                        </div>

                    </div>

                    <div className="search-filter">
                        <div className="search-filter-column">
                            <label className="genre-container">Tất cả
                                <input type="checkbox" className="genre-input" checked="checked" />
                                <span className="checkmark"></span>
                            </label>
                            <label className="genre-container">Kỹ năng
                                <input type="checkbox" className="genre-input" />
                                <span className="checkmark"></span>
                            </label>
                            <label className="genre-container">Kinh doanh
                                <input type="checkbox" className="genre-input" />
                                <span className="checkmark"></span>
                            </label>
                            <label className="genre-container">Văn học kinh điển
                            <input type="checkbox" className="genre-input" />
                                <span className="checkmark"></span>
                            </label>
                            <label className="genre-container">Văn học đương đại
                            <input type="checkbox" className="genre-input" />
                                <span className="checkmark"></span>
                            </label>
                            <label className="genre-container">Văn học nữ giới
                            <input type="checkbox" className="genre-input" />
                                <span className="checkmark"></span>
                            </label>
                            <label className="genre-container">Lãng mạn
                            <input type="checkbox" className="genre-input" />
                                <span className="checkmark"></span>
                            </label>
                            <label className="genre-container">Light novel
                                <input type="checkbox" className="genre-input" />
                                <span className="checkmark"></span>
                            </label>
                            <label className="genre-container">Graphic novel
                                <input type="checkbox" className="genre-input" />
                                <span className="checkmark"></span>
                            </label>
                            <label className="genre-container">Tội phạm
                                <input type="checkbox" className="genre-input" />
                                <span className="checkmark"></span>
                            </label>

                            <label className="genre-container">Trinh thám
                                <input type="checkbox" className="genre-input" />
                                <span className="checkmark"></span>
                            </label>
                            <label className="genre-container">Kinh dị (Horror)
                                <input type="checkbox" className="genre-input" />
                                <span className="checkmark"></span>
                            </label>
                            <label className="genre-container">Kinh dị (Thriller)
                                <input type="checkbox" className="genre-input" />
                                <span className="checkmark"></span>
                            </label>

                            <label className="genre-container">Tiểu sử
                                <input type="checkbox" className="genre-input" />
                                <span className="checkmark"></span>
                            </label>
                            <label className="genre-container">Hồi ký
                                <input type="checkbox" className="genre-input" />
                                <span className="checkmark"></span>
                            </label>
                        </div>
                        <div className="search-filter-column">
                            <label className="genre-container">Khoa học
                                <input type="checkbox" className="genre-input" />
                                <span className="checkmark"></span>
                            </label>

                            <label className="genre-container">Triết học
                                <input type="checkbox" className="genre-input" />
                                <span className="checkmark"></span>
                            </label>

                            <label className="genre-container">Tâm lý học
                                <input type="checkbox" className="genre-input" />
                                <span className="checkmark"></span>
                            </label>
                            <label className="genre-container">Lịch sử
                                <input type="checkbox" className="genre-input" />
                                <span className="checkmark"></span>
                            </label>
                            <label className="genre-container">Lịch sử giã tưởng
                                <input type="checkbox" className="genre-input" />
                                <span className="checkmark"></span>
                            </label>
                            <label className="genre-container">Hư cấu
                                <input type="checkbox" className="genre-input" />
                                <span className="checkmark"></span>
                            </label>
                            <label className="genre-container">Fantasy
                                <input type="checkbox" className="genre-input" />
                                <span className="checkmark"></span>
                            </label>
                            <label className="genre-container">Khoa học viễn tưởng
                                <input type="checkbox" className="genre-input" />
                                <span className="checkmark"></span>
                            </label>


                            <label className="genre-container">Huyền bí
                                <input type="checkbox" className="genre-input" />
                                <span className="checkmark"></span>
                            </label>
                            <label className="genre-container">Siêu linh
                                <input type="checkbox" className="genre-input" />
                                <span className="checkmark"></span>
                            </label>
                            <label className="genre-container">Paranomal
                                <input type="checkbox" className="genre-input" />
                                <span className="checkmark"></span>
                            </label>
                            <label className="genre-container">Nghệ thuật
                                <input type="checkbox" className="genre-input" />
                                <span className="checkmark"></span>
                            </label>
                            <label className="genre-container">Âm nhạc
                                <input type="checkbox" className="genre-input" />
                                <span className="checkmark"></span>
                            </label>
                            <label className="genre-container">Thơ
                                <input type="checkbox" className="genre-input" />
                                <span className="checkmark"></span>
                            </label>
                            <label className="genre-container">Thể thao
                                <input type="checkbox" className="genre-input" />
                                <span className="checkmark"></span>
                            </label>


                            <label className="genre-container">Du lịch
                                <input type="checkbox" className="genre-input" />
                                <span className="checkmark"></span>
                            </label>
                        </div>





                    </div>

                </div>

                <Footer />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return state;
};

export default connect(mapStateToProps)(SearchResult);

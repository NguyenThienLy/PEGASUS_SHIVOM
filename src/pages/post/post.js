import * as React from 'react'
import 'isomorphic-unfetch'
import Head from 'next/head'
import Link from 'next/link'
import './post.scss'

import { connect } from 'react-redux'
import { api } from '../../services'
import { Header, ComponentLoading, Loading } from '../../components'
import { auth } from 'firebase';
import { action } from '../../actions';



const firebaseAuthentication = require('../../authentication/firebase')

class Post extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            book: {},
            author: {},
            category: {},
            reviewer: {},
            isFollow: false,
            followId: null,
            books: [],
            isHomeUser: true,
            loading: true,
            isBtnLoading: false
        }
    }
    static async getInitialProps({ req, query }) {
        const slug = query.slug
        const post = await api.post.getItemBySlug(slug, { query: { fields: ["$all"] } })
        return {
            post: post
        }
    }

    async componentDidMount() {
        this.setState({ loading: false })
        try {
            const book = await this.getBook()
            this.getAuthor(book)
            this.getReviewer(book)
            this.getSameBook(book)

            setTimeout(() => {
                if (this.props.user) {
                    if (this.props.user._id !== this.props.post.userId) {
                        this.setState({ isHomeUser: false })
                        api.userFollow.findOne({
                            query: {
                                filter: {
                                    fromId: this.props.user._id,
                                    toId: this.props.post.userId
                                }
                            }
                        }).then(result => {
                            this.setState({ isFollow: true, followId: result._id })
                            this.forceUpdate()
                        }).catch(err => {
                            console.log("not found: ", err)
                        })
                    }
                } else {
                    this.setState({ isHomeUser: false })
                }
            }, 3000)
            this.forceUpdate()
        } catch (err) {

        } finally {

        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.user) {
            if (!this.state.isHomeUser && this.state.reviewer._id === nextProps.user._id) {
                this.setState({ isHomeUser: true })
            }
        }
        return true
    }
    getBook = async () => {
        const bookIndex = this.props.books.findIndex((book) => { return book._id === this.props.post.bookId })
        let book
        if (bookIndex !== -1) {
            book = this.props.books[bookIndex]
        } else {
            book = await api.book.getItem(this.props.post.bookId, {
                query: {
                    fields: ["$all"]
                }
            })
            this.props.dispatch(action.book.add(book))
        }
        this.setState({ book })
        return book
    }
    getSameBook = async (book) => {
        api.book.getList({
            query: {
                filter: {
                    categoryId: book.categoryId
                },
                limit: 3,
                fields: ["$all", { author: ["name", "avatar", "_id"] }]
            }
        }).then(books => {
            this.setState({ books: books })
            this.props.dispatch(action.book.concat(books))
        }).catch(err => {
            console.log("Get same book err: ", err)
        })
    }
    getAuthor = async (book) => {
        const authorId = this.props.authors.findIndex((author) => { return author._id === book.authorId })
        let author
        if (authorId !== -1) {
            author = this.props.authors[authorId]
        } else {
            author = await api.bookAuthor.getItem(book.authorId, {
                query: {
                    fields: ["$all"]
                }
            })
            this.props.dispatch(action.author.add(author))
        }
        this.setState({ author })
        return author
    }
    getCategory = async (book) => {
        const categoryIndex = this.props.categories.findIndex((category) => { return category._id === book.categoryId })
        let category
        if (categoryIndex !== -1) {
            book = this.props.categories[categoryIndex]
        } else {
            category = await api.category.getItem(book.categoryId, {
                query: {
                    fields: ["$all"]
                }
            })
            this.props.dispatch(action.category.add(category))
        }
        this.setState({ category })
        return category
    }
    getReviewer = async (book) => {
        const reviewerIndex = this.props.reviewers.findIndex((reviewer) => { return reviewer._id === this.props.post.userId })
        let reviewer
        if (reviewerIndex !== -1) {
            reviewer = this.props.reviewers[reviewerIndex]
        } else {
            reviewer = await api.user.getItem(this.props.post.userId, {
                query: {
                    fields: ["$all"]
                }
            })
            this.props.dispatch(action.reviewer.add(reviewer))
        }
        this.setState({ reviewer })
        return reviewer
    }
    followUser = async () => {
        this.setState({ isBtnLoading: true })
        if (!this.props.user) {
            alert("Vui lòng đăng nhập trước khi thực hiện thao tác này")
        } else {
            try {
                const token = await firebaseAuthentication.getIdToken()
                const result = await api.userFollow.create({
                    toId: this.state.reviewer._id
                }, {
                        headers: {
                            access_token: token
                        }
                    })
                this.setState({ isFollow: true, followId: result._id })
            } catch (err) {
                console.log("err: ", err)
                alert("Theo dõi không thành công")
            }
        }
        this.setState({ isBtnLoading: false })
    }
    unFollowUser = async () => {
        this.setState({ isBtnLoading: true })
        try {
            const token = await firebaseAuthentication.getIdToken()
            const result = await api.userFollow.delete(this.state.followId, {
                headers: {
                    access_token: token
                }
            })
            this.setState({ isFollow: false, followId: null })
        } catch (err) {
            console.log("err: ", err)
            alert("Theo dõi không thành công")
        } finally {
            this.setState({ isBtnLoading: false })
        }
    }
    render() {

        return (
            <div>
                <Head>
                    <title>{this.props.post.title}</title>
                    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css" integrity="sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay" crossorigin="anonymous" />
                </Head>
                <Header {...this.props} />
                {this.state.loading ? <Loading /> :
                    <div className="post-body">
                        <div className="post-body__content">
                            <div className="post-title"><h1 className="post-title__h1">{this.props.post.title}</h1></div>
                            <div className="book-info">
                                <h2 className="book-info__h2">
                                    <div>
                                        <a href="#" className="book-info__title">{this.state.book.title}</a> <i>của</i> <a href="#" className="book-info__author">{this.state.author.name}</a>
                                    </div>

                                </h2>

                                <div className="book-info__book-genre">
                                    <a href="#">{this.state.category.name}</a>
                                </div>
                            </div>

                            {!this.state.reviewer.firstName ? <ComponentLoading style={{
                                height: "100px"
                            }} /> : <div className="reviewer-info">

                                    <div className="reviewer-info__avatar">
                                        <a href="#" className="reviewer-info__avatar reviewer-info__avatar--hover">
                                            <img
                                                src={this.state.reviewer.avatar}
                                                alt="User's avatar"
                                                className="reviewer-info__avatar--style">
                                            </img>
                                        </a>
                                    </div>
                                    <div className="reviewer-info__username">
                                        <Link as={`/profile/${this.state.reviewer._id}`} href={`/profile/profile?profileId=${this.state.reviewer._id}`}>
                                            <a href="#">{this.state.reviewer.firstName} {this.state.reviewer.lastName}</a>
                                        </Link>
                                    </div>
                                    <div className="reviewer-info__follow">
                                        {!this.state.isHomeUser ? <div>
                                            {this.state.isFollow ?
                                                <button type="button" className="reviewer-info__follow__button" onClick={this.unFollowUser} disabled={this.state.isBtnLoading}>{this.state.isBtnLoading ? <i class="fas fa-circle-notch fa-spin"></i> : "Huỷ theo dõi"}</button> :
                                                <button type="button" className="reviewer-info__follow__button" onClick={this.followUser} disabled={this.state.isBtnLoading}>{this.state.isBtnLoading ? <i class="fas fa-circle-notch fa-spin"></i> : "Theo dõi"}</button>}</div> : null}
                                    </div>
                                    <div className="reviewer-info__given-point">
                                        - đã cho quyển sách này n điểm
                            </div>
                                </div>
                            }


                            <div className="post-content">
                                <p>{this.props.post.content}</p>
                            </div>
                            <div className="post-tags"></div>
                            <div className="post-comment"></div>
                        </div>
                        {/* =================================================== */}
                        <div className="post-subgroup">
                            <div className="post-subgroup__book-info">
                                <div className="post-subgroup__book-info__title">
                                    <Link as={`/sach/${this.state.book._id}`} href={`/book/book?bookId=${this.state.book._id}`}>
                                        <a
                                            href="#"
                                            className="post-subgroup__book-info__title__a">
                                            {this.state.book.title}
                                        </a>
                                    </Link>
                                    <div className="post-subgroup__book-info__title__average-point">
                                        rate this book
                                </div>
                                </div>
                                <div className="post-subgroup__book-info__img">
                                    <a href="#">
                                        <img
                                            src={this.state.book.thumb}
                                            alt={this.state.book.title}
                                            className="post-subgroup__book-info__img--float">
                                        </img>
                                    </a>
                                </div>
                                <div className="post-subgroup__book-info__shortcut">
                                    {this.state.book.description ? this.state.book.description.slice(0, 255) : ""}
                                    <span>
                                        {this.state.book.description && this.state.book.description.lengh > 255 ? <a
                                            href="#"
                                            className="post-subgroup__book-info__shortcut__more">
                                            &nbsp;...xem thêm
                                    </a> : null}
                                    </span>
                                </div>
                            </div>

                            <div className="post-subgroup__author-info">
                                <div className="post-subgroup__author-info__name">
                                    <a
                                        href="#"
                                        className="post-subgroup__author-info__name__a">
                                        {this.state.author.name}
                                    </a>
                                </div>
                                <div className="post-subgroup__author-info__top">
                                    <div className="post-subgroup__author-info__top__avatar">
                                        <a href="#" className="post-subgroup__author-info__top__avatar--hover">
                                            <img
                                                src={this.state.author.avatar}
                                                alt="author's image"
                                                className="post-subgroup__author-info__top__avatar__img">
                                            </img>
                                        </a>
                                    </div>
                                    <div className="post-subgroup__author-info__top__name">
                                        <a href="#" className="post-subgroup__author-info__top__name__a">{this.state.author.name}</a>
                                    </div>
                                    <div className="post-subgroup__author-info__top__follow">
                                        <button type="button" className="post-subgroup__author-info__top__follow__button">Theo dõi</button>
                                    </div>
                                </div>
                                <div className="post-subgroup__author-info__bottom">
                                    {this.state.author.biography ? this.state.author.biography.slice(0, 255) : ""}
                                    <span>
                                        {this.state.author.biography && this.state.author.biography.lengh > 255 ? <a
                                            href="#"
                                            className="post-subgroup__author-info__bottom__more">
                                            &nbsp;...xem thêm
                                    </a> : null}
                                    </span>
                                </div>
                            </div>
                            <div className="post-subgroup__related-books">
                                <div className="post-subgroup__related-books__title">
                                    <a
                                        href="#"
                                        className="post-subgroup__related-books__title__a">
                                        Sách cùng thể loại
                                </a>
                                </div>
                                {this.state.books.map((book => {
                                    return (
                                        <div className="post-subgroup__related-books__content">
                                            <tr className="rlb-content-tr">
                                                <td className="rlb-content-tr__td-cover">
                                                    <a href="#">
                                                        <img
                                                            src={book.thumb}
                                                            alt="related book cover"
                                                            className="rlb-content-tr__td-cover__img"></img>
                                                    </a>
                                                </td>
                                                <td className="rlb-content-tr__td-detail">
                                                    <Link as={`/sach/${book._id}`} href={`/book/book?bookId=${book._id}`}>
                                                        <a href={`/sach/${this.state.book._id}`}><span>{book.title}</span></a>
                                                    </Link>
                                                    <br></br>
                                                    <span><i>của </i></span>
                                                    <span><a href="#"> {book.author.name}</a></span>
                                                    <br></br>
                                                    <div>{book.rate} điểm</div>
                                                </td>
                                            </tr>
                                        </div>
                                    )
                                }))}

                            </div>
                        </div>
                        {/* =================================================== */}
                        <div className="post-widget">
                            <div className="post-widget__reviewer-avatar">
                                <a href="#">
                                    <img
                                        src={this.state.reviewer.avatar}
                                        onerror="this.onerror=null;this.src='https://instagram.fsgn4-1.fna.fbcdn.net/vp/42b79272c0fc6ccea431c76e02a15133/5D7BB3CB/t51.2885-19/s150x150/56194279_2392509284143924_5773805861218549760_n.jpg?_nc_ht=instagram.fsgn4-1.fna.fbcdn.net';"
                                        alt="User's avatar"
                                        className="post-widget__reviewer-avatar__img">
                                    </img>
                                </a>
                            </div>
                            <div className="post-widget__username">
                                <a href="#" className="post-widget__username__a">{this.state.reviewer.firstName} {this.state.reviewer.lastName}</a>
                            </div>
                            <div className="post-widget__quote">
                                <div>
                                    <i className="fas fa-quote-left"></i>
                                </div>
                                <div className="post-widget__quote--style">Đời là bể khổ, mua thịt gà ăn</div>
                                <div className="fas-quote-icon-right">
                                    <i className="fas fa-quote-right"></i>
                                </div>
                            </div>
                            <div className="post-widget__follow">
                                {!this.state.isHomeUser ? <div>
                                    {this.state.isFollow ?
                                        <button type="button" className="post-widget__follow__button" onClick={this.unFollowUser} disabled={this.state.isBtnLoading}>{this.state.isBtnLoading ? <i class="fas fa-circle-notch fa-spin"></i> : "Huỷ theo dõi"}</button> :
                                        <button type="button" className="post-widget__follow__button" onClick={this.followUser} disabled={this.state.isBtnLoading}>{this.state.isBtnLoading ? <i class="fas fa-circle-notch fa-spin"></i> : "Theo dõi"}</button>}</div> : null}

                                <hr></hr>
                            </div>

                            <div className="post-widget__function-buttons">
                                <div>
                                    <i className="far fa-heart"></i>
                                </div>
                                <div>
                                    <i className="far fa-bookmark"></i>
                                </div>
                                <div>
                                    <i className="fab fa-facebook-square"></i>
                                </div>
                                <div>
                                    <i className="fab fa-twitter"></i>
                                </div>

                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return state;
};

export default connect(mapStateToProps)(Post);


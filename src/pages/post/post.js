import * as React from 'react'
import 'isomorphic-unfetch'
import Head from 'next/head'
import Link from 'next/link'
import './post.scss'

import { connect } from 'react-redux'
import { api } from '../../services'
import { Header } from '../../components'



class Post extends React.Component {
    constructor(props) {
        super(props)
    }
    static async  getInitialProps({ req, query }) {
        const slug = req.params.postId
        const posts = await api.post.getList({ query: { fields: ["$all"], filter: { slug: slug } } })
        return {
            post: posts[0]
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
                
                <div className="post-body">
                    <div className="post-body__content">
                        <div className="post-title"><h1 className="post-title__h1">Tuyệt phẩm văn học của Mario Puzo</h1></div>
                        <div className="book-info">
                            <h2 className="book-info__h2">
                                <div>
                                    <a href="#" className="book-info__title">Bố Già</a> <i>của</i> <a href="#" className="book-info__author">Mario Puzo</a>
                                </div>
                                <div className="book-info__average-point"> - điểm trung bình: n </div>
                            </h2>
                            
                            <div className="book-info__book-genre">
                                <a href="#">kinh điển</a>, <a href="#">giả tưởng</a>
                            </div>
                        </div>
                        <div className="reviewer-info">
                            <div className="reviewer-info__avatar">
                                <a href="#" className="reviewer-info__avatar reviewer-info__avatar--hover">
                                    <img 
                                    src="https://instagram.fsgn4-1.fna.fbcdn.net/vp/42b79272c0fc6ccea431c76e02a15133/5D7BB3CB/t51.2885-19/s150x150/56194279_2392509284143924_5773805861218549760_n.jpg?_nc_ht=instagram.fsgn4-1.fna.fbcdn.net" 
                                    alt="User's avatar"
                                    className="reviewer-info__avatar--style">
                                    </img>
                                </a>
                            </div>
                            <div className="reviewer-info__username">
                                <a href="#">Lê Nguyễn Minh</a>
                            </div>
                            <div className="reviewer-info__follow">
                                <button type="button" className="reviewer-info__follow__button">Theo dõi</button>
                            </div>
                            <div className="reviewer-info__given-point">
                                - đã cho quyển sách này n điểm
                            </div>
                        </div>
                        
                        <div className="post-content">
                            <p>{this.props.post.content}</p>
                        </div>
                        <div className="post-comment">
                            
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

export default connect(mapStateToProps)(Post);


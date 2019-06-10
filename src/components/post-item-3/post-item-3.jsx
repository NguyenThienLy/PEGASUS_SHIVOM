import React, { Component } from 'react';
import './post-item-3.scss'
import { CloudImage } from '..';

import Link from 'next/link'

export class PostItem3 extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    readMoreContent() {
        const content = document.getElementById(this.props.post._id + "content-post");
        content.innerHTML = this.props.post.content;

        const btnReadMore = document.getElementById(this.props.post._id + "read-more-post-btn");
        btnReadMore.style.display = "none";
        const btnShorten = document.getElementById(this.props.post._id + "shorten-post-btn");
        btnShorten.style.display = "block";
    }

    shortenContent() {
        const content = document.getElementById(this.props.post._id + "content-post");
        content.innerHTML = this.props.post.content.substring(0, 300) + "...";

        const btnReadMore = document.getElementById(this.props.post._id + "read-more-post-btn");
        btnReadMore.style.display = "block";
        const btnShorten = document.getElementById(this.props.post._id + "shorten-post-btn");
        btnShorten.style.display = "none";
    }
    render() {
        const { post, author } = this.props;
        return (
            <div className="post-item-3-wrap">
                <div className="first-line">
                    <div className="infor-author">
                        <div className="img">
                            <CloudImage src={author.avatar} alt="" />
                        </div>
                        <div className="right-column">
                            <div className="author">
                                <div className="name"><a href="profile/{author._id}">{author.firstName} {author.lastName}</a></div>
                                {/* <div className="follow">Theo dõi</div> */}
                            </div>
                            <div className="time">{post.createdAt}</div>
                        </div>
                    </div>

                </div>
                <div className="img" style={{ backgroundImage: "url(" + post.thumb + ")" }}>
                    {/* <CloudImage src={post.images} alt="" /> */}
                </div>
                <div className="title-react-line">

                    <div className="title">
                        <Link as={`/bai-viet/${this.props.post.slug}`} href={`/post/post?slug=${this.props.post.slug}`}>
                            <a href={`/bai-viet/${this.props.post.slug}`}>{post.title}</a>
                        </Link>
                    </div>
                    <div className="postReactions"><i className="fab fa-gratipay"></i>{post.postReactions} lượt thích</div>
                </div>
                <div className="name-book">
                    <Link as={`/sach/${this.props.post.book._id}`} href={`/book/book?bookId=${this.props.post.book._id}`}>
                        <a href={`/sach/${this.props.post.book._id}`}>{post.book.title}</a>
                    </Link>
                </div>
                <div className="description">{post.description}</div>
                <div className="content" id={post._id + "content-post"}>{post.content.substring(0, 300)}...</div>
                <div className="read-more" id={post._id + "read-more-post-btn"} onClick={() => this.readMoreContent()}>Xem thêm</div>
                <div className="shorten" id={post._id + "shorten-post-btn"} onClick={() => this.shortenContent()}>Thu gọn</div>
            </div>
        );
    }
}


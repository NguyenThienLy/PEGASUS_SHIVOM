import React, { Component } from 'react';
import { CloudImage } from '../../../../components';
import Link from 'next/link'
import * as moment from 'moment'
import './post-stand-out-card.scss';

class PostStandOutCard extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        const { post } = this.props
        return (
            <div className="fisrt-stand-out-post">
                <div className="img">
                    <a href="#"><CloudImage src={post.thumb} alt="" /></a>
                </div>
                <div className="book">
                    <Link as={`/sach/${post.book._id}`} href={`/book/book?bookId=${post.book._id}`}>
                        {post.book.title}
                    </Link>
                </div>
                <div className="title">
                    <Link as={`/bai-viet/${post.slug}`} href={`/post/post?slug=${post.slug}`}>
                        <a>{post.title}</a>
                    </Link>
                </div>
                <div className="author-time">
                    <Link as={`/profile/${post.user._id}`} href={`/profile/profile?profileId=${post.user._id}`}>
                        <div className="author"><a>{post.user.firstName} {post.user.lastName}</a></div>
                    </Link>
                    <div className="time">{moment(post.createdAt).format("DD/MM/YYYY HH:mm")}</div>
                    <div className="love">{post.reaction} <i className="fab fa-gratipay"></i></div>
                </div>
                <div className="decription">{post.description ? post.description.substring(0, 100) + "..." : ""}</div>
            </div>
        );
    }
}

export default PostStandOutCard;
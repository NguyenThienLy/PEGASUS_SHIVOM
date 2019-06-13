import React, { Component } from 'react';
import './post-item-2.scss'
import Link from 'next/link'
import { CloudImage } from '..';

export class PostItem2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authorElement: null
        }
    }
    async componentDidMount() {
        if (this.props.users) {
            const user = this.props.users.find((user) => { return user._id = this.props.post.userId })
            const authorElement = <div className="author">
                <Link as={`/profile/${user._id}`} href={`/profile/profile?profileId=${user._id}`}>
                    <a>{user.firstName} {user.lastName}</a>
                </Link>
            </div>
            this.setState({ authorElement })
        }

    }
    render() {
        const { post } = this.props;
        // const { post } = this.props;
        return (
            <div className="post-item-2-wrap">
                <div className="img">
                    <Link as={`/bai-viet/${post.slug}`} href={`/post/post?slug=${post.slug}`}>
                        <a href="/bai-viet/{post._id}"><CloudImage src={post.thumb} alt={post.title} /></a>
                    </Link>
                </div>
                <div className="mask"></div>
                <div className="book">
                    <Link as={`/sach/${post.book._id}`} href={`/book/book?bookId=${post.book._id}`}>
                        <a href="#">
                            <span>{post.book.title.substring(0, 50)}</span>
                        </a>
                    </Link>
                </div>
                <div className="title"><div>
                    <Link as={`/bai-viet/${post.slug}`} href={`/post/post?slug=${post.slug}`}>
                        <a href="/bai-viet/{post._id}">{post.title}</a>
                    </Link>
                </div></div>
                {this.state.authorElement}
                <div className="time-react">
                    <div href="#">{post.createAt}</div>
                    <div className="rating">{post.reaction} <i className="fab fa-gratipay"></i></div>
                </div>
                <div className="description">{post.description}</div>
            </div>
        );
    }
}

import React, { Component } from 'react';
import './post-item-2.scss'

export class PostItem2 extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const { post } = this.props;
        // const { post } = this.props;
        return (
            <div id="post-item-2-wrap">
                <div className="img"><a href="/bai-viet/{post._id}"><img src={post.images} alt={post.title} /></a></div>
                <div className="mask"></div>
                <div className="book"><a href="#">
                    <span>{post.book.substring(0, 50)}</span>
                </a> </div>
                <div className="title"><div><a href="/bai-viet/{post._id}">{post.title}</a> </div></div>
                <div className="author"><a href="#">{post.author}</a></div>
                <div className="time-react">
                    <div href="#">{post.createAt}</div>
                    <div className="rating">{post.postReactions} <i className="fab fa-gratipay"></i></div>
                </div>
                <div className="description">{post.description}</div>
            </div>
        );
    }
}

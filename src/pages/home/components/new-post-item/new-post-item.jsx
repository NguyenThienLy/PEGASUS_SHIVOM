import React, { Component } from 'react';
import './new-post-item.scss'


export class NewPostItem extends Component {
    state = {}
    render() {
        const { post } = this.props
        return (
            <div className="post-item-wrap">
                <div className="img">
                    <a href="#">
                        <img src={post.thumb} alt="" />
                    </a>
                    <div className="book"><a href="">{post.book.title.substring(0, 15)}...</a></div>
                </div>
                <div className="title"><a href="">{post.title}</a></div>
            </div>);
    }
}

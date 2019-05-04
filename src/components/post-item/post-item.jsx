import React, { Component } from 'react';
import './post-item.scss'
export class PostItem extends Component {
    state = {}
    render() {
        const { post } = this.props
        return (
            <div id="post-item-wrap">
                <div className="img"><img src={post.img} alt="" /></div>
                <div className="content">
                    <div className="title">{post.title}</div>
                    <div className="time">{post.time}</div>
                </div>
            </div>
        );
    }
}

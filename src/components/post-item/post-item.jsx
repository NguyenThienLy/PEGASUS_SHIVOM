import React, { Component } from 'react';
import './post-item.scss'
import * as moment from 'moment'
export class PostItem extends Component {
    state = {}
    render() {
        const { post } = this.props
        return (
            <div id="post-item-wrap">
                <div className="img"><a href="#"><img src={post.thumb} alt="" /></a></div>
                <div className="content">
                    <div className="title"><a href="#">{post.title}</a></div>
                    <div className="time">{moment(post.createdAt).format("DD/MM/YYYY HH:mm")}</div>
                </div>
            </div>
        );
    }
}

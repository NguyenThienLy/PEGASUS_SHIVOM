import React, { Component } from 'react';
import './post-item.scss'
import * as moment from 'moment'
import Link from 'next/link'
export class PostItem extends Component {
    state = {}
    render() {
        const { post } = this.props
        return (
            <div id="post-item-wrap">
                <div className="img"><a href="#"><img src={post.thumb} alt="" /></a></div>
                <div className="content">
                    <div className="title">
                        <Link href={`/bai-viet/${post.slug}`}>
                            <a href="#">{post.title}</a>
                        </Link>
                    </div>
                    <div className="time">{moment(post.createdAt).format("DD/MM/YYYY HH:mm")}</div>
                </div>
            </div>
        );
    }
}

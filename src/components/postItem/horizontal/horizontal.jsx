import React, { Component } from 'react';
import './horizontal.scss'
import * as moment from 'moment'
import Link from 'next/link'
import { CloudImage } from '../..';

export class PostItemHorizontal extends Component {
    state = {}
    render() {
        const { post } = this.props
        return (
            <div className="post-item_horizontal">
                <div className="img">
                <Link as={`/bai-viet/${post.slug}`} href={`/post/post?slug=${post.slug}`}>
                        <CloudImage src={post.thumb} alt="" />
                    </Link></div>
                <div className="content">
                    <div className="title">
                    <Link as={`/bai-viet/${post.slug}`} href={`/post/post?slug=${post.slug}`}>
                            <a>{post.title}</a>
                        </Link>
                    </div>
                    <div className="time">{moment(post.createdAt).format("DD/MM/YYYY HH:mm")}</div>
                </div>
            </div>
        );
    }
}

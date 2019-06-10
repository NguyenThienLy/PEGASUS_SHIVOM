import React, { Component } from 'react';
import './post-item.scss'
import * as moment from 'moment'
import Link from 'next/link'
import { CloudImage } from '..';
export class PostItem extends Component {
    state = {}
    render() {
        const { post } = this.props
        return (
            <div className="post-item-wrap">
                <div className="img">

                   <Link as={`/bai-viet/${post.slug}`} href={`/post/post?slug=${post.slug}`}>
                        <a href="#"><CloudImage src={post.thumb} alt="" /></a>
                    </Link>
                </div>
                <div className="content">
                    <div className="title">
                        <Link as={`/bai-viet/${post.slug}`} href={`/post?slug=${post.slug}`}>
                            <a>{post.title}</a>
                        </Link>
                        {/* <Link as={`/bai-viet/${post.slug}`} href={`/post/post?slug=${post.slug}`}>
                            <a href="#">{post.title}</a>
                        </Link> */}
                    </div>
                    <div className="time">{moment(post.createdAt).format("DD/MM/YYYY HH:mm")}</div>
                </div>
            </div>
        );
    }
}

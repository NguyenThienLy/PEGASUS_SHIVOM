import React, { Component } from 'react';
import './new-post-item.scss'
import Link from 'next/link'
import { CloudImage } from '../../../../components';


export class NewPostItem extends Component {
    state = {}
    render() {
        const { post } = this.props
        return (
            <div className="post-item-wrap">
                <div className="img">
                    <a href="#">
                        <CloudImage src={post.thumb} alt="" />
                    </a>
                    <div className="book">
                        <Link href={`/sach/${post.book._id}`}>
                            <a href="">{post.book.title.substring(0, 15)}...</a>
                        </Link>
                    </div>
                </div>
                <div className="title">
                <Link href={`/bai-viet/${post.slug}`}>
                <a href="">{post.title}</a>
                </Link>
                </div>
            </div>);
    }
}

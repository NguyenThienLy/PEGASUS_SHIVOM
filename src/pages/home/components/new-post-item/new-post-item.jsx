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
                    <Link as={`/sach/${post.book._id}`} href={`/book/book?bookId=${post.book._id}`}>
                            <a href="">{post.book.title.substring(0, 15)}...</a>
                        </Link>
                    </div>
                </div>
                <div className="title">
                <Link as={`/bai-viet/${post.slug}`} href={`/post/post?slug=${post.slug}`}>
                <a href="">{post.title}</a>
                </Link>
                </div>
            </div>);
    }
}

import React, { Component } from 'react';
import './new-post-item.scss'
import Link from 'next/link'


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
                    <div className="book">
                        <Link href={`/bai-viet/${post.slug}`}>
                            <a href="">{post.book.title.substring(0, 15)}...</a>
                        </Link>
                    </div>
                </div>
                <div className="title"><a href="">{post.title}</a></div>
            </div>);
    }
}

import React, { Component } from 'react';
import { PostItem } from '../../../../components/post-item/post-item'
import './stand-out-posts-2-column.scss'
import * as moment from 'moment'
import Link from 'next/link'
import { CloudImage, PostItemHorizontal } from '../../../../components';

export class StandOutPost2Column extends Component {
    state = {}
    render() {
        const { posts } = this.props;
        return (
            <div className="stand-out-post-2-column-main">
                {posts.length == 0 && (<div className="stand-out-post-2-column-empty">
                    "Không có bài viết nào"
                </div>)}

                {
                    posts.length > 0 && (
                        <div className="stand-out-post-2-column">
                            <div className="stand-out-post-2-column-main_left">
                                {
                                    posts.map((item, index) => {
                                        if (index === 0) {
                                            return (
                                                <div className="fisrt-stand-out-post" key={index}>
                                                    <div className="img">
                                                        <CloudImage src={posts[0].thumb} alt="" />
                                                    </div>
                                                    <div className="book">
                                                        <Link href={`/the-loai/${posts[1].book._id}`}>
                                                            {posts[0].book.title}
                                                        </Link>
                                                    </div>
                                                    <div className="title">
                                                        <Link as={`/bai-viet/${posts[0].slug}`} href={`/post/post?slug=${posts[0].slug}`}>
                                                            <a>{posts[0].title}</a>
                                                        </Link>
                                                    </div>
                                                    <div className="author-time">
                                                        <Link as={`/profile/${posts[0].user._id}`} href={`/profile/profile?profileId=${posts[0].user._id}`}>
                                                            <div className="author"><a>{posts[0].user.firstName} {posts[0].user.lastName}</a></div>
                                                        </Link>
                                                        <div className="time">{moment(posts[0].createdAt).format("DD/MM/YYYY HH:mm")}</div>
                                                        <div className="love">{posts[0].reaction} <i className="fab fa-gratipay"></i></div>
                                                    </div>
                                                    <div className="decription">{posts[0].description ? posts[0].description.substring(0, 100) + "..." : ""}</div>
                                                </div>
                                            )
                                        }
                                        else if (index % 2 === 0) {
                                            return (
                                                <div><PostItemHorizontal post={item} key={index} /></div>
                                            )
                                        }
                                    })
                                }
                            </div>
                            <div className="stand-out-post-2-column-main_right">
                                {
                                    posts.map((item, index) => {
                                        if (index === 1) {
                                            return (
                                                <div className="second-stand-out-post" key={index}>
                                                    <div className="img"><CloudImage src={posts[1].thumb} alt="" /></div>
                                                    <div className="book">
                                                        <Link href={`/the-loai/${posts[1].book._id}`}>
                                                            {posts[1].book.title}
                                                        </Link>
                                                    </div>
                                                    <div className="title">
                                                        <Link as={`/bai-viet/${posts[1].slug}`} href={`/post/post?slug=${posts[1].slug}`}>
                                                            <a>{posts[1].title}</a>
                                                        </Link>
                                                    </div>
                                                    <div className="author-time">
                                                        <Link as={`/profile/${posts[1].user._id}`} href={`/profile/profile?profileId=${posts[1].user._id}`}>
                                                            <div className="author"><a>{posts[1].user.firstName} {posts[1].user.lastName}</a></div>
                                                        </Link>
                                                        <div className="time">{moment(posts[1].createdAt).format("DD/MM/YYYY HH:mm")}</div>
                                                        <div className="love">{posts[1].reaction} <i className="fab fa-gratipay"></i></div>
                                                    </div>
                                                    <div className="decription">{posts[1].description ? posts[1].description.substring(0, 100) + "..." : ""}</div>
                                                </div>
                                            )
                                        }
                                        else if (index % 2 === 1) {
                                            return (
                                                <div><PostItemHorizontal post={item} key={index} /></div>
                                            )
                                        }
                                    })
                                }
                            </div>
                        </div>
                    )
                }
            </div>

        );
    }
}


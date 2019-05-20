import React, { Component } from 'react';
import { PostItem } from '../../../../components/post-item/post-item'
import './stand-out-posts-2-column.scss'
import * as moment from 'moment'

export class StandOutPost2Column extends Component {
    state = {}
    render() {
        const { posts } = this.props;
        console.log("posts: ", posts)
        return (
            <div>
                {posts.length == 0 && (<div id="stand-out-post-2-column-empty">
                    "Không có bài viết nào"
                </div>)}

                {
                    posts.length > 0 && (
                        <div id="stand-out-post-2-column">
                            <div className="left">
                                {
                                    posts.map((item, index) => {
                                        if (index === 0) {
                                            return (
                                                <div className="fisrt-stand-out-post">
                                                    <div className="img"><a href="#"><img src={posts[0].thumb} alt="" /> </a></div>
                                                    <div className="book"><a href="#">{posts[0].book.title}</a> </div>
                                                    <div className="title"><a href="#">{posts[0].title}</a></div>
                                                    <div className="author-time">
                                                        <div className="author"><a href="#">{posts[0].user.firstName} {posts[0].user.lastName}</a></div>
                                                        <div className="time">{moment(posts[0].createdAt).format("DD/MM/YYYY HH:mm")}</div>
                                                        <div className="love">{posts[0].reaction} <i class="fab fa-gratipay"></i></div>
                                                    </div>
                                                    <div className="decription">{posts[0].description ? posts[0].description.substring(0, 100) + "..." : ""}</div>
                                                </div>
                                            )
                                        }
                                        else if (index % 2 === 0) {
                                            return (
                                                <div><PostItem post={item} /></div>
                                            )
                                        }
                                    })
                                }
                            </div>
                            <div className="right">
                                {
                                    posts.map((item, index) => {
                                        if (index === 1) {
                                            return (
                                                <div className="second-stand-out-post">
                                                    <div className="img"><a href="#"><img src={posts[1].thumb} alt="" /> </a></div>
                                                    <div className="book"><a href="#">{posts[1].book.title}</a> </div>
                                                    <div className="title"><a href="#">{posts[1].title}</a></div>
                                                    <div className="author-time">
                                                        <div className="author"><a href="#">{posts[1].user.firstName} {posts[1].user.lastName}</a></div>
                                                        <div className="time">{moment(posts[1].createdAt).format("DD/MM/YYYY HH:mm")}</div>
                                                        <div className="love">{posts[1].reaction} <i class="fab fa-gratipay"></i></div>
                                                    </div>
                                                    <div className="decription">{posts[1].description ? posts[1].description.substring(0, 100) + "..." : ""}</div>
                                                </div>
                                            )
                                        }
                                        else if (index % 2 === 1) {
                                            return (
                                                <div><PostItem post={item} /></div>
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


import React, { Component } from 'react';
import { PostItem } from '../../../../components/post-item/post-item'
import './stand-out-posts-2-column.scss'

export class StandOutPost2Column extends Component {
    state = {}
    render() {
        const { posts } = this.props;
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
                                                    <div className="img"><a href="#"><img src={posts[0].img} alt="" /> </a></div>
                                                    <div className="book"><a href="#">{posts[0].book}</a> </div>
                                                    <div className="title"><a href="#">{posts[0].title}</a></div>
                                                    <div className="author-time">
                                                        <div className="author"><a href="#">{posts[0].author}</a></div>
                                                        <div className="time">{posts[0].time}</div>
                                                        <div className="love">{posts[0].love} <i class="fab fa-gratipay"></i></div>
                                                    </div>
                                                    <div className="decription">{posts[0].decription.substring(0, 100)}...</div>
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
                                                    <div className="img"><a href="#"><img src={posts[1].img} alt="" /> </a></div>
                                                    <div className="book"><a href="#">{posts[1].book}</a> </div>
                                                    <div className="title"><a href="#">{posts[1].title}</a></div>
                                                    <div className="author-time">
                                                        <div className="author"><a href="#">{posts[1].author}</a></div>
                                                        <div className="time">{posts[1].time}</div>
                                                        <div className="love">{posts[1].love} <i class="fab fa-gratipay"></i></div>
                                                    </div>
                                                    <div className="decription">{posts[1].decription.substring(0, 100)}...</div>
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


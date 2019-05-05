import React, { Component } from 'react';
import { PostItem } from '../post-item/post-item'
import './stand-out-posts-2-column.scss'

export class StandOutPost2Column extends Component {
    state = {}
    render() {
        const { posts } = this.props;

        return (
            <div id="stand-out-post-2-column">
                <div className="left">
                    {
                        posts.map((item, index) => {
                            if (index % 2 == 0) {
                                if (index == 0) {
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
                                else {
                                    return (
                                        <div><PostItem post={item} /></div>
                                    )
                                }
                            }
                        })
                    }
                </div>
                <div className="right">
                    {
                        posts.map((item, index) => {
                            if (index % 2 == 1) {
                                if (index == 1) {
                                    return (
                                        <div className="second-stand-out-post">
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
                                else {
                                    return (
                                        <div><PostItem post={item} /></div>
                                    )
                                }
                            }
                        })
                    }
                </div>
            </div>
        );
    }
}


import React, { Component } from 'react';
import { PostItem } from '../../../../components/post-item/post-item'
import './stand-out-posts.scss'
import { CloudImage } from '../../../../components';
import Link from 'next/link'

export class StandOutPost extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }


    render() {
        const { posts, typeBook } = this.props;
        const activePost = posts[0];
        return (
            <div className="stand-out-post-main">
                {this.props.posts.length > 0 ? <div className="stand-out-post">
                    {
                        posts.length > 0 && (
                            <div className="stand-out-post_active">
                                <div className="img" style={{ backgroundImage: "url(" + activePost.img + ")" }}></div>
                                <div className="book"><a href="#">{activePost.book}</a> </div>
                                <div className="title"><a href="#">{activePost.title}</a></div>
                                <div className="author-time">
                                    <Link href={`/profile`}>
                                        <div className="author"><a href="#">{activePost.author}</a></div>
                                    </Link>
                                    <div className="time">{activePost.time}</div>
                                    <div className="love">{activePost.love} <i className="fab fa-gratipay"></i></div>
                                </div>
                                <div className="decription">{activePost.decription.substring(0, 100)}...</div>
                            </div>
                        )
                    }
                    <div className="stand-out-post_posts">
                        {
                            posts.map((item, index) => {
                                if (index != 0) {
                                    return (
                                        <PostItem post={item} key={index} />
                                    )
                                }
                            })
                        }
                    </div>

                </div> : <div className="empty">
                        {posts.length == 0 && "Không có bài viết nào"}
                    </div>}
            </div>
        );
    }
} 

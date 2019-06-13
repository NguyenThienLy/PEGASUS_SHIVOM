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
        const { typeBook } = this.props;
        const activePost = this.props.posts[0];
        const posts = this.props.posts.filter((item, index) => index != 0);

        return (
            <div className="stand-out-post-wrap">
                {this.props.posts.length > 0 ? <div className="stand-out-post">
                    {
                        posts.length > 0 && (
                            <div className="active">
                                <div className="img">
                                    <img src={activePost.img} alt={activePost.title} />
                                </div>
                            {/* <div className="stand-out-post_active">
                                <div className="img" style={{ backgroundImage: "url(" + activePost.img + ")" }}></div> */}
                                <div className="book"><a href="#">{activePost.book}</a> </div>
                                <div className="title"><a href="#">{activePost.title}</a></div>
                                <div className="author-time">
                                    <Link as={`/profile`} href={`/profile/profile?profileId=123`}>
                                        <div className="author"><a href="#">{activePost.author}</a></div>
                                    </Link>
                                    <div className="time">{activePost.time}</div>
                                    <div className="love">{activePost.love} <i className="fab fa-gratipay"></i></div>
                                </div>
                                <div className="decription">{activePost.decription.substring(0, 200)}...</div>
                            </div>
                        )
                    }
                    <div className="stand-out-post_posts">
                        {
                            posts.map((item, index) => {
                                return (
                                    <PostItem post={item} />
                                )
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

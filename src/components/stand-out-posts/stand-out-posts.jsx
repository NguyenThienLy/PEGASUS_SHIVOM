import React, { Component } from 'react';
import { PostItem } from '../post-item/post-item'
import './stand-out-posts.scss'

export class StandOutPost extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentType: 0,
            currentIndexActive: 0
        }
    }


    render() {
        const { posts, typeBook } = this.props;
        // console.log("post kajdkf: " + posts + this.state.currentType)
        const activePost = posts[this.state.currentIndexActive];
        return (
            <div className="stand-out-post-wrap">

                {/* stand-out-post-wrap */}
                <div className="stand-out-post">
                    <div className="active">
                        <div className="img"><a href="#"><img src={activePost.img} alt="" /> </a></div>
                        <div className="book"><a href="#">{activePost.book}</a> </div>
                        <div className="title"><a href="#">{activePost.title}</a></div>
                        <div className="author-time">
                            <div className="author"><a href="#">{activePost.author}</a></div>
                            <div className="time">{activePost.time}</div>
                            <div className="love">{activePost.love} <i class="fab fa-gratipay"></i></div>
                        </div>
                        <div className="decription">{activePost.decription.substring(0, 100)}...</div>
                    </div>
                    <div className="post">
                        {
                            posts.map((item, index) => {
                                if (this.state.currentType == 0 || item.type == this.state.currentType) {
                                    return (
                                        <PostItem post={item} />
                                    )
                                }
                            })
                        }


                    </div>
                </div>
                {/* //stand-out-post-wrap */}

            </div>
        );
    }
} 

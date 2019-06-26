import React, { Component } from 'react';
import { PostItem } from '../../../../components/post-item/post-item'
import PostStandOutCard from '../post-stand-out-card/post-stand-out-card';
import './stand-out-posts-2-column.scss'
import * as moment from 'moment'
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
                            <div className="stand-out-post-2-column__left">
                                {
                                    posts.map((item, index) => {
                                        if (index === 0) {
                                            return (
                                                <PostStandOutCard post={posts[0]} />
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
                            <div className="stand-out-post-2-column__right">
                                {
                                    posts.map((item, index) => {
                                        if (index === 1) {
                                            return (
                                                <PostStandOutCard post={posts[1]} />
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


import React, { Component } from 'react';
import { PostItem } from '../post-item/post-item'
import './stand-out-posts-2-column.scss'

export class StandOutPost2Column extends Component {
    state = {}
    render() {
        const { posts } = this.props;

        return (
            <div id="stand-out-post-2-column">
                {
                    posts.length >= 1 && (
                        <div className="fisrt-post">
                            <div className="img"><a href="#"><img src={posts[0].img} alt="" /></a></div>
                            <div className="book"></div>
                        </div>
                    )

                }
            </div>
        );
    }
}


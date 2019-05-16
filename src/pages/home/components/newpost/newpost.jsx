import React, { Component } from 'react';
import './newpost.scss'
import { Headline } from "../../../../components";
import { NewPostItem } from "../new-post-item/new-post-item"
import './newpost.scss'


export class NewPost extends Component {
    state = {}
    render() {
        const { posts } = this.props;
        return (
            <div id="new-post-wrap">
                <Headline title="Bài viết mới nhất" />
                <div className="post">
                    <div className="left">
                        {
                            posts.map((item, index) => {
                                if (index % 2 == 0)
                                    return (
                                        <NewPostItem post={item} />
                                    )
                            })
                        }
                    </div>
                    <div className="right">
                        {
                            posts.map((item, index) => {
                                if (index % 2 != 0)
                                    return (
                                        <NewPostItem post={item} />
                                    )
                            })
                        }
                    </div>
                </div>

            </div>

        )
    }
}
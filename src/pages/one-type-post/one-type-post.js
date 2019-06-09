import React, { Component } from 'react';
import './one-type-post.scss';
import { PostItem2, Headline, Loading, Footer, CloudImage } from '../../components/';
import { Header } from '../../components/header/header';
import Head from 'next/head';
import { connect } from 'react-redux';
import { api } from '../../services';

class OneTypePost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: null,
            posts: [
                
            ],
            typeBook: 'Truyện ngắn'
        };
    }
    static async  getInitialProps({ req, query }) {
        const slug = req.params.slug
        const category = await api.bookCategory.getItemBySlug(slug, {
            query: {
                fields: ["$all"]
            }
        })
        return {
            category: category
        }
    }
    async componentDidMount() {

        try {
            const posts = await api.bookCategory.getPosts(this.props.category._id, {
                query: {
                    fields: ["$all"]
                }
            })
            const users = await api.user.getList({
                query: {
                    fields: ["firstName", "lastName", "_id"],
                    filter: { _id: { $in: posts.map(post => { return post.userId }) } }
                }
            })
            this.setState({ users, posts })
            this.forceUpdate()
        } catch (err) {
            console.log("erd: ", err)
        }
    }
    render() {
        const typeBook = "Truyện ngắn";
        return (
            <div>
                <Head>
                    <title>{this.props.category.name}</title>
                    <meta name="title" content={this.props.category.name}/>
                    <meta name="description" content={this.props.category.name}/>
                </Head>
                <Header {...this.props} />

                {this.state.users ?
                    <div className="one-type-post-page-wrap container">
                        <div className="name-type-wrap">
                            <div className="img">
                                <CloudImage src="https://i.imgur.com/2Rp3ACm.jpg" alt={this.props.category.name} />
                            </div>
                            <div className="name-type-book"><div>{this.props.category.name}</div></div>
                        </div>
                        <div className="one-type-posts-wrap">
                            <div>
                                {
                                    this.state.posts.map((item, index) => {
                                        if (index % 3 == 0) {
                                            return (
                                                <PostItem2 post={item} users={this.state.users} key={index}/>
                                            )
                                        }
                                    })
                                }
                            </div>
                            <div>
                                {
                                    this.state.posts.map((item, index) => {
                                        if (index % 3 == 1) {
                                            return (
                                                <PostItem2 post={item} users={this.state.users} key={index}/>
                                            )
                                        }
                                    })
                                }
                            </div>
                            <div>
                                {
                                    this.state.posts.map((item, index) => {
                                        if (index % 3 == 2) {
                                            return (
                                                <PostItem2 post={item} users={this.state.users} key={index}/>
                                            )
                                        }
                                    })
                                }
                            </div>

                        </div>
                    </div> : <Loading />}
                    <Footer/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
	return state;
};

export default connect(mapStateToProps)(OneTypePost);

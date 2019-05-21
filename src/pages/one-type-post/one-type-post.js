import React, { Component } from 'react';
import './one-type-post.scss';
import { PostItem2, Headline, Loading, Footer } from '../../components/';
import { Header } from '../../components/header/header';
import Head from 'next/head';
import { connect } from 'react-redux';
import { api } from '../../services';

class OneTypePost extends Component {
    state = {};
    constructor(props) {
        super(props);
        this.state = {
            users: null,
            posts: [
                {
                    _id: 1,
                    title: 'Hãy hướng về phía mặt trời',
                    slug: '',
                    description:
                        'Ai cũng cần động lực để giúp bản thân làm những điều mình cần làm. Cuốn sách này giúp tôi nhận ra nhiều điều trong cuộc sống',
                    postTemplate: '',
                    content: '...',
                    thumb:
                        'http://dinhvankiem.com/demo/e-reading/wp-content/uploads/2016/05/book-759873_1920-370x218.jpg',
                    images:
                        'http://dinhvankiem.com/demo/e-reading/wp-content/uploads/2016/05/book-759873_1920-370x218.jpg',
                    userId: '',
                    bookId: '',
                    createAt: '10:34 12/03/2019',
                    book: "Trước bình minh là đêm tối",
                    postReactions: 4,
                },
                {
                    images: "http://dinhvankiem.com/demo/e-reading/wp-content/uploads/2016/05/glasses-272399_1920-370x218.jpg",
                    createAt: '10:34 12/03/2019',
                    title: 'Sống là cho đâu chỉ nhận riêng mình',
                    author: 'Nguyễn Nhật Minh Vy',
                    description:
                        'Cuộc sống là một cuốn nhật ký và bạn chính là chủ nhân. Hãy viêt sao để nó trở thành cuốn nhật ký đáng đọc.',
                    postReactions: 4,
                    book: "Trước bình minh là đêm tối"
                },
                {
                    images: "http://dinhvankiem.com/demo/e-reading/wp-content/uploads/2016/05/glasses-272399_1920-370x218.jpg",
                    createAt: '10:34 12/03/2019',
                    title: 'Sống là cho đâu chỉ nhận riêng mình',
                    author: 'Nguyễn Nhật Minh Vy',
                    description:
                        'Cuộc sống là một cuốn nhật ký và bạn chính là chủ nhân. Hãy viêt sao để nó trở thành cuốn nhật ký đáng đọc.',
                    postReactions: 4,
                    book: "Trước bình minh là đêm tối"
                },
                {
                    images: '/img/slide0.jpg',
                    createAt: '10:34 12/03/2019',
                    title: 'Sống là cho đâu chỉ nhận riêng mình',
                    author: 'Nguyễn Nhật Minh Vy',
                    description:
                        'Cuộc sống là một cuốn nhật ký và bạn chính là chủ nhân. Hãy viêt sao để nó trở thành cuốn nhật ký đáng đọc.',
                    postReactions: 4,
                    book: "Trước bình minh là đêm tối"
                }
            ],
            typeBook: 'Truyện ngắn'
        };
    }
    static async  getInitialProps({ req, query }) {
        const slug = req.params.slug
        const categories = await api.bookCategory.getList({
            query: {
                fields: ["$all"],
                filter: { slug }
            }
        })
        const posts = await api.bookCategory.getPosts(categories[0]._id, {
            query: {
                fields: ["$all"]
            }
        })


        return {
            category: categories[0],
            posts
        }
    }
    async componentDidMount() {

        try {
            const users = await api.user.getList({
                query: {
                    fields: ["firstName", "lastName", "_id"],
                    filter: { _id: { $in: this.props.posts.map(post => { return post.userId }) } }
                }
            })
            console.log("user: ", users)
            this.setState({ users })
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
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                    <link href="../app.scss" rel="stylesheet" />
                    <link href="https://fonts.googleapis.com/css?family=Merriweather|Montserrat" rel="stylesheet" />
                    <script
                        src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
                        integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN"
                        crossOrigin="anonymous"
                    />
                    <script
                        src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"
                        integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q"
                        crossOrigin="anonymous"
                    />
                    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css" integrity="sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay" crossorigin="anonymous"></link>
                </Head>
                <Header {...this.props} />
                {this.state.users ?
                    <div className="container">
                        <div className="name-type-wrap">
                            <div className="img">
                                <img src="/img/type-book.jpg" alt={this.props.category.name} />
                            </div>
                            <div className="name-type-book"><div>{this.props.category.name}</div></div>
                        </div>
                        <div className="one-type-posts-wrap">
                            <div>
                                {
                                    this.props.posts.map((item, index) => {
                                        if (index % 3 == 0) {
                                            return (
                                                <PostItem2 post={item} users={this.state.users} />
                                            )
                                        }
                                    })
                                }
                            </div>
                            <div>
                                {
                                    this.props.posts.map((item, index) => {
                                        if (index % 3 == 1) {
                                            return (
                                                <PostItem2 post={item} users={this.state.users} />
                                            )
                                        }
                                    })
                                }
                            </div>
                            <div>
                                {
                                    this.props.posts.map((item, index) => {
                                        if (index % 3 == 2) {
                                            return (
                                                <PostItem2 post={item} users={this.state.users} />
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

import * as React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { connect } from 'react-redux'
import { api } from '../../services'
import { action } from '../../actions';

import './post.scss'
import {
    Header,
    Footer,
    ContactUs,
    SearchBox,
    LatestPost,
    RelatedPost,
    PostAuthor
} from '../../components'
import { SocialGroup } from "../../components/footer/socialGroup/socialGroup"

class Post extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            postContent: {
                link: "#",
                author: {
                    name: "jessica smith",
                    link: "#"
                },
                category: {
                    name: "post",
                    link: "#"
                },
                tags: [
                    {
                        name: "business",
                        link: "#"
                    },
                    {
                        name: "city break",
                        link: "#"
                    },
                    {
                        name: "vacations",
                        link: "#"
                    }
                ],
                title: "almond butter fig healthy hair smoothie",
            },
            postAuthor: {
                name: 'ngọc hạnh',
                position: 'giáo viên',
                avatar: 'https://dalia.elated-themes.com/wp-content/uploads/2018/06/fitness-gallery-img-5a.jpg',
                description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, distinctio, eveniet eaque et, sapiente hic tempora repellat deserunt odit iure recusandae? Architecto, quisquam."
            },
            relatedPosts: [
                {
                    name: 'ngọc hạnh',
                    createdDate: {
                        day: 22,
                        month: 'Th1'
                    },
                    image: 'https://dalia.elated-themes.com/wp-content/uploads/2018/06/blog-list-img-1.jpg',
                    title: 'luyện tập yoga có lợi gì',
                },
                {
                    name: 'ngọc hạnh',
                    createdDate: {
                        day: 22,
                        month: 'Th1'
                    },
                    image: 'https://dalia.elated-themes.com/wp-content/uploads/2018/05/portfolio-img3.jpg',
                    title: 'luyện tập yoga có lợi gì',
                }
            ],
            categories: [
                {
                    name: 'Course 1',
                    classes: 3,
                },
                {
                    name: 'Course 2',
                    classes: 2,
                },
                {
                    name: 'Course 3',
                    classes: 3,
                },
            ],
            latestPost: [
                {
                    link: "#",
                    image:
                        "https://dalia.elated-themes.com/wp-content/uploads/2018/05/blog-img-6-150x150.jpg",
                    title: "clean beauty",
                    date: "13th jun"
                },
                {
                    link: "#",
                    image:
                        "https://dalia.elated-themes.com/wp-content/uploads/2018/05/blog-img-8-150x150.jpg",
                    title: "Daily Detox Frappé",
                    date: "13th jun"
                },
                {
                    link: "#",
                    image:
                        "https://dalia.elated-themes.com/wp-content/uploads/2018/05/blog-img-7-150x150.jpg",
                    title: "Be Smart-Eat Wise WISE",
                    date: "13th jun"
                }
            ]

        }
    }
    static async getInitialProps({ req, query }) {
        return {

        }
    }

    async componentDidMount() {
        var heightOfFooter = $(".post__footer .footer-wrapper").height();
        $(".post__contact-us").css("margin-bottom", heightOfFooter + "px");
    }

    render() {

        return (
            <div>
                <Head>
                    <title>Bài viết chi tiết</title>
                    <meta name="title" content="Bài viết" />
                    <meta name="description" content="Bài viết chi tiết" />
                </Head>
                <Header {...this.props} />
                <React.Fragment>
                    <div className="post__path">
                        <a href="http://hiephoayoga.com">trang chủ</a> / <a href="http://hiephoayoga.com/cac-bai-viet">các bài viết</a> / <a>abc</a>
                    </div>
                    <div className="post">
                        <div className="post__wrapper">
                            <div className="post__wrapper__main-content">
                                <div className="post__wrapper__main-content__info">
                                    <div className="post__wrapper__main-content__info__author">
                                        <span>By&nbsp;</span>
                                        <a href={this.state.postContent.author.link}>{this.state.postContent.author.name}</a>
                                    </div>
                                    <div className="post__wrapper__main-content__info__category">
                                        <a href={this.state.postContent.category.link}>{this.state.postContent.category.name}</a>
                                    </div>
                                    <div className="post__wrapper__main-content__info__tags">
                                        {
                                            this.state.postContent.tags.map(tag => {
                                                return ([<a href={tag.link}>{tag.name}</a>,
                                                <span>,&nbsp;</span>]);
                                            })
                                        }
                                    </div>
                                </div>
                                <h1 className="post__wrapper__main-content__title">
                                    <a href="#">{this.state.postContent.title}</a>
                                </h1>
                                <div className="post__wrapper__main-content__content">
                                // content of the post
                                </div>
                                <div className="post__wrapper__main-content__post-author">
                                    <PostAuthor postAuthor={this.state.postAuthor} />
                                </div>
                                <div className="post__wrapper__main-content__text-divider">
                                    <h3>Bài viết liên quan</h3>
                                </div>
                                <div className="post__wrapper__main-content__related-posts">

                                    {
                                        this.state.relatedPosts.map((post) => {
                                            return (
                                                <div className="post__wrapper__main-content__related-posts__post">
                                                    <RelatedPost relatedPost={post} />
                                                </div>
                                            );
                                        })
                                    }
                                </div>
                            </div>

                            <div className="post__wrapper__sub-content">

                                <div className="post__wrapper__sub-content__search">
                                    <SearchBox type='search' />
                                </div>

                                <div className="post__wrapper__sub-content__social-group">
                                    <SocialGroup />
                                </div>

                                <div className="post__wrapper__sub-content__categories">
                                    <div className="post__wrapper__sub-content__categories__text">
                                        Thể loại
                	                </div>
                                    {
                                        this.state.categories.map((category) => {
                                            return (
                                                <div className="post__wrapper__sub-content__categories__category">
                                                    {category.name} ({category.classes})
                                                </div>
                                            )
                                        })
                                    }
                                </div>

                                <div className="post__wrapper__sub-content__latest-posts">
                                    <div className="post__wrapper__sub-content__categories__text">
                                        bài viết
                	                </div>
                                    {
                                        this.state.latestPost.map((post, index) => {
                                            return (
                                                <div key={index} className="post__wrapper__sub-content__latest-posts__post">
                                                    <LatestPost latestPost={post} />
                                                </div>
                                            );
                                        })
                                    }
                                </div>
                                <div className="post__wrapper__sub-content__email">
                                    <div className="post__wrapper__sub-content__categories__text">
                                        Liên hệ
               		                </div>
                                    <p>Liên hệ để biết thêm thông tin về khoá học của chúng tôi.</p>
                                    <SearchBox type='email' />
                                </div>

                            </div>
                        </div>
                        <div className="post__contact-us">
                            <ContactUs />
                        </div>
                    </div>
                </React.Fragment>
                <div className="post__footer">
                    <Footer />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return state;
};

export default connect(mapStateToProps)(Post);


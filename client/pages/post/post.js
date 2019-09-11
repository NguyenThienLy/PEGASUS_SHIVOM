import * as React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { connect } from 'react-redux'
import { api } from '../../services'
import { action } from '../../actions';
import { bindActionCreators } from 'redux'
import Router from 'next/router'

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
            latestNews: [],
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
        let news
        if (query.newsId) {
            news = await api.news.getItemFromClient(query.newsId, {
                query: {
                    populates: [
                        { path: "category", select: "name slug" },
                        { path: "author", select: "firstName lastName avatar" }
                    ]
                }
            })
        } else {
            news = await api.news.getNewsFromClientBySlug(query.newsSlug, {
                query: {
                    populates: [
                        { path: "category", select: "name slug" },
                        { path: "author", select: "firstName lastName avatar" }
                    ]
                }
            })
        }
        console.log("news: ", news)
        return { newsData: news }

    }
    fetchData() {
        if (this.props.courses.items.length === 0) {
            this.props.fetchCourse()
        }
        if (!this.props.setting.fetched) {
            this.props.fetchSetting();
        }
        if (this.props.newCategories.items.length === 0) {
            this.props.fetchNewCategory()
        }
    }
    async componentDidMount() {
        this.fetchData()
        this.getLatestNews()
        var heightOfFooter = $(".post__footer .footer-wrapper").height();
        $(".post__contact-us").css("margin-bottom", heightOfFooter + "px");
    }
    getLatestNews() {
        api.news.getList({
            query: {
                order: { createdAt: -1 },
                populates: [{ path: "category", select: "name slug" }]
            }
        }).then(res => {
            this.setState({ latestNews: res.results.objects.rows })
        }).catch(err => {

        })
    }

    render() {
        return (
            <div>
                <Head>
                    <title>{this.props.newsData.title}</title>
                    <meta name="title" content={this.props.newsData.title} />
                    <meta name="description" content={this.props.newsData.description} />
                </Head>
                <Header {...this.props} />
                <React.Fragment>
                    <div className="post__path">
                        <span>
                            <Link href="/home/home" as="/">
                                <a href="/">Trang chủ</a>
                            </Link> </span>/
                        <span><Link href={`/blog/blog?categorySlug=${this.props.newsData.category.slug}`} as={`/${this.props.newsData.category.slug}`}>
                            <a href={`/${this.props.newsData.category.slug}`}>{this.props.newsData.category.name}</a>
                        </Link></span> /
                        <span><Link href={`/post/post?categorySlug=${this.props.newsData.category.slug}&newsSlug=${this.props.newsData.slug}`} as={`/${this.props.newsData.category.slug}/${this.props.newsData.slug}`}>
                            <a>{this.props.newsData.title}</a>
                        </Link></span>
                    </div>
                    <div className="post">
                        <div className="post__wrapper">
                            <div className="post__wrapper__main-content">
                                <div className="post__wrapper__main-content__info">
                                    <div className="post__wrapper__main-content__info__author">
                                        <span>By&nbsp;</span>
                                        <a href="#">{this.props.newsData.author.firstName} {this.props.newsData.author.lastName}</a>
                                    </div>
                                    <div className="post__wrapper__main-content__info__category">
                                        <Link href={`/blog/blog?categorySlug=${this.props.news.category}`} as={`/${this.props.newsData.category.slug}`}>
                                            <a href={`/${this.props.newsData.category.slug}`}>{this.props.newsData.category.name}</a>
                                        </Link>
                                    </div>
                                    <div className="post__wrapper__main-content__info__tags">
                                        {
                                            this.props.newsData.tags.map(tag => {
                                                // return ([<a href={tag.link}>{tag.name}</a>,
                                                // <span>,&nbsp;</span>]);
                                                return ([tag,
                                                    <span>,&nbsp;</span>]);
                                            })
                                        }
                                    </div>
                                </div>
                                <h1 className="post__wrapper__main-content__title">
                                    <a href="#">{this.props.news.title}</a>
                                </h1>
                                <div className="post__wrapper__main-content__content" dangerouslySetInnerHTML={{ __html: this.props.newsData.content }}>
                                </div>
                                <div className="post__wrapper__main-content__post-author">
                                    <PostAuthor postAuthor={this.props.newsData.author} />
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
                                        this.props.newCategories.items.map((category) => {
                                            return (
                                                <div className="post__wrapper__sub-content__categories__category">
                                                    <Link href={`/blog/blog?categorySlug=${category.slug}`} as={`/${category.slug}`}>
                                                        <a href={`/${category.slug}`} >
                                                            {category.name}
                                                        </a>
                                                        {/* {course.name} ({course.classes}) */}
                                                    </Link>
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
                                        this.state.latestNews.map((post, index) => {
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
                            <ContactUs {...this.props.setting.contact} addContact={this.addContact} courses={this.props.courses.items} defaultCourse={this.props.course} />
                        </div>
                    </div>
                </React.Fragment>
                <div className="post__footer">
                    <Footer {...this.props.setting.contact} logo={this.props.setting.logo} />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return state;
};

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchCourse: action.course.fetch,
    fetchSetting: action.setting.fetch,
    fetchNewCategory: action.newCategory.fetch,
    addContact: action.contact.add,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Post);


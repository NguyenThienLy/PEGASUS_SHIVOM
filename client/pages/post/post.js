import * as React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { connect } from 'react-redux'
import { api } from '../../services'
import { action } from '../../actions';
import { bindActionCreators } from 'redux'
import Router from 'next/router'

// import Swal from 'sweetalert2'
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
            relatedNews: [

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
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.newsData._id !== prevProps.newsData._id) {
            this.getRelatestNews()
        }
        if (this.props.contacts.isAddSuccess && !prevProps.contacts.isAddSuccess) {
            Swal.fire("Thành công", 'Gửi liên hệ thành công', 'success')
            this.props.addContactRefresh()
        }
        if (this.props.contacts.isAddError && prevProps.contacts.adding) {
            Swal.fire("Thất bại", 'Gửi liên hệ không thành công', 'error')
            this.props.addContactRefresh()
        }
    }
    async componentDidMount() {
        this.fetchData()
        this.getLatestNews()
        this.getRelatestNews()
        var heightOfFooter = $(".post__footer .footer-wrapper").height();
        $(".post__contact-us").css("margin-bottom", heightOfFooter + "px");
    }
    getRelatestNews() {
        const randomOffset = Math.floor(Math.random() * 10);
        api.news.getList({
            query: {
                limit: 2,
                offset: randomOffset,
                filter: { category: this.props.newsData.category._id, _id: { $ne: this.props.newsData._id } },
                populates: [
                    { path: "category", select: "name slug" },
                    { path: "author", select: "firstName lastName avatar" }
                ]
            }
        }).then(res => {
            if (res.results.objects.rows.length === 0) {
                api.news.getList({
                    query: {
                        limit: 2,
                        filter: { category: this.props.newsData.category._id, _id: { $ne: this.props.newsData._id } },
                        populates: [
                            { path: "category", select: "name slug" },
                            { path: "author", select: "firstName lastName avatar" }
                        ]
                    }
                }).then(res => {
                    this.setState({ relatedNews: res.results.objects.rows })
                })
            } else {
                this.setState({ relatedNews: res.results.objects.rows })
            }
        }).catch(err => {

        })
    }
    getLatestNews() {
        api.news.getList({
            query: {
                limit: 5,
                order: { createdAt: -1 },
                populates: [{ path: "category", select: "name slug" }]
            }
        }).then(res => {
            this.setState({ latestNews: res.results.objects.rows })
        }).catch(err => {

        })
    }
    addContact = (body) => {
        this.props.addContact(body)
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
                            </Link> </span>&nbsp;&nbsp;<i className="fas fa-chevron-right"></i>&nbsp;&nbsp;
                        <span><Link href={`/blog/blog?categorySlug=${this.props.newsData.category.slug}`} as={`/${this.props.newsData.category.slug}`}>
                            <a href={`/${this.props.newsData.category.slug}`}>{this.props.newsData.category.name}</a>
                        </Link></span> &nbsp;&nbsp;<i className="fas fa-chevron-right"></i>&nbsp;&nbsp;
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
                                    <a href="#">{this.props.newsData.title}</a>
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
                                        this.state.relatedNews.map((post, index) => {
                                            return (
                                                <div className="post__wrapper__main-content__related-posts__post" key={index}>
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
                                    {this.props.setting.social ? <SocialGroup social={this.props.setting.social} /> : null}
                                </div>

                                <div className="post__wrapper__sub-content__categories">
                                    <div className="post__wrapper__sub-content__categories__text">
                                        Thể loại
                	                </div>
                                    {
                                        this.props.newCategories.items.map((category, index) => {
                                            return (
                                                <div className="post__wrapper__sub-content__categories__category" key={index}>
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
                    <Footer {...this.props.setting.contact} logo={this.props.setting.logo} social={this.props.setting.social} />
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
    addContactRefresh: action.contact.addRefresh
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Post);


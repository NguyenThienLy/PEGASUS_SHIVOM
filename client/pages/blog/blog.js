import React from "react";

import Head from "next/head";
import Link from "next/link";
import Router from "next/router";
import { connect } from "react-redux";
import { api } from "../../services";
import { action } from "../../actions";
import { bindActionCreators } from "redux";

import Swal from "sweetalert2";

import {
  Header,
  Footer,
  ContactUs,
  News2,
  SearchBox,
  LatestPost,
  HoverDivAnimation
} from "../../components";
import { SocialGroup } from "../../components/footer/socialGroup/socialGroup";
import "./blog.scss";

class Blog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      new2: [
        {
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
          image:
            "https://dalia.elated-themes.com/wp-content/uploads/2018/05/blog-single-img-1.jpg",
          dateCreated: {
            link: "#",
            day: "7th",
            month: "jun"
          },
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vitae feugiat magna, ut mattis ligula. Aliquam ut rutrum est. Maecenas sit amet scelerisque orci. Aenean et ex ut elit tincidunt rutrum vitae eleifend metus. Nunc tincidunt venenatis tellus euismod fermentum. Maecenas sed dapibus eros. Phasellus eu mi metus. Nunc mi nisl, viverra id sollicitudin et, auctor sit amet augue. Morbi blandit dolor ac rhoncus semper. Donec rutrum risus vitae arcu interdum condimentum. Pellentesque eu ex metus. Maecenas facilisis est at aliquet blandit. Nullam volutpat ultricies enim, ut pulvinar enim placerat non. Aenean facilisis aliquam felis in fermentum. Aenean ullamcorper pharetra purus.",
          comment: {
            link: "#",
            quantity: 3
          },
          love: {
            link: "#",
            quantity: 0
          },
          button: "đọc thêm"
        },
        {
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
          image:
            "https://dalia.elated-themes.com/wp-content/uploads/2018/06/nutrition-home-blog-img-5-768x569.jpg",
          dateCreated: {
            link: "#",
            day: "7th",
            month: "jun"
          },
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vitae feugiat magna, ut mattis ligula. Aliquam ut rutrum est. Maecenas sit amet scelerisque orci. Aenean et ex ut elit tincidunt rutrum vitae eleifend metus. Nunc tincidunt venenatis tellus euismod fermentum. Maecenas sed dapibus eros. Phasellus eu mi metus. Nunc mi nisl, viverra id sollicitudin et, auctor sit amet augue. Morbi blandit dolor ac rhoncus semper. Donec rutrum risus vitae arcu interdum condimentum. Pellentesque eu ex metus. Maecenas facilisis est at aliquet blandit. Nullam volutpat ultricies enim, ut pulvinar enim placerat non. Aenean facilisis aliquam felis in fermentum. Aenean ullamcorper pharetra purus.",
          comment: {
            link: "#",
            quantity: 3
          },
          love: {
            link: "#",
            quantity: 0
          },
          button: "đọc thêm"
        }
      ],
      categories: [
        {
          name: "Course 1",
          classes: 3
        },
        {
          name: "Course 2",
          classes: 2
        },
        {
          name: "Course 3",
          classes: 3
        }
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
    };
  }
  static async getInitialProps({ req, query }) {
    // Lấy slug của danh mục tin tức
    const slug = query.categorySlug;
    console.log("slug: ", slug)
    try {
      const category = await api.newCategory.getNewsCategoryBySlug(slug);
      console.log("category: ", category)
      const res = await api.news.getList({
        query: {
          filter: { category: category._id },
          status: "active"
        },
        populates: [{ path: "author", select: "firstName%20lastName" }]
      });
      console.log("res: ", res)
      return { lstNews: res.results.objects.rows, category: category };
    } catch (error) {
      console.log("err: ", error)
    }
  }

  componentWillReceiveProps(nextProps) {
    return true;
  }
  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }
  async componentDidMount() {
    this.fetchData();
    this.getLatestNews();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.contacts.isAddSuccess && !prevProps.contacts.isAddSuccess) {
      Swal.fire("Thành công", "Gửi liên hệ thành công", "success");
      this.props.addContactRefresh();
    }
    if (this.props.contacts.isAddError && prevProps.contacts.adding) {
      Swal.fire("Thất bại", "Gửi liên hệ không thành công", "error");
      this.props.addContactRefresh();
    }
  }
  getLatestNews() {
    api.news
      .getList({
        query: {
          limit: 5,
          order: { createdAt: -1 },
          filter: {
            status: "active"
          },
          populates: [{ path: "category", select: "name slug" }]
        }
      })
      .then(res => {
        this.setState({ latestNews: res.results.objects.rows });
      })
      .catch(err => { });
  }
  fetchData() {
    this.props.fetchCourse({
      query: {
        filter: {
          status: "active"
        }
      }
    });
    this.props.fetchSetting({
      query: {
        filter: {
          status: "active"
        }
      }
    });
    this.props.fetchNewCategory({
      query: {
        filter: {
          status: "active"
        }
      }
    });
  }
  addContact = body => {
    this.props.addContact(body);
  };
  render() {
    return (
      <div className="blog">
        <Head>
          <title>{this.props.category.name}</title>
          <meta name="title" content={this.props.category.name} />
          <meta name="description" content={this.props.category.description} />
        </Head>
        <React.Fragment>
          <div className="background-overlay"></div>
          <Header {...this.props} />

          <div className="blog__body">
            <div className="blog__body__breadcrumb">
              <span>
                <Link href="/home/home" as="/">
                  <a href="/">Trang chủ</a>
                </Link>
              </span>
              &emsp;<i className="fas fa-chevron-right"></i>&emsp;
              <span>
                <Link
                  href={`/blog/blog?categorySlug=${this.props.category.slug}`}
                  as={`/${this.props.category.slug}`}
                >
                  <a href={`/${this.props.category.slug}`}>
                    {this.props.category.name}
                  </a>
                </Link>
              </span>
            </div>

            <div className="blog__body__wrapper">
              <div className="blog__body__wrapper__main-content">
                <div className="blog__body__wrapper__main-content__search">
                  <SearchBox type="search" />
                </div>
                {this.props.lstNews.map((news2, index) => {
                  news2.category = this.props.category;

                  return (
                    <div key={index}>
                      <News2 key={index} news2={news2}></News2>
                    </div>
                  );
                })}
              </div>

              <div className="blog__body__wrapper__sub-content">
                <div className="blog__body__wrapper__sub-content__search">
                  <SearchBox type="search" />
                </div>

                <div className="blog__body__wrapper__sub-content__social-group">
                  {this.props.setting.social ? (
                    <SocialGroup social={this.props.setting.social} />
                  ) : null}
                </div>

                <div className="blog__body__wrapper__sub-content__title">
                  Tin tức
                </div>
                <div className="blog__body__wrapper__sub-content__categories">
                  {this.props.newCategories.items.map((category, index) => {
                    return (
                      <div
                        key={index}
                        className="blog__body__wrapper__sub-content__categories__category"
                      >
                        <Link
                          href={`/blog/blog?categorySlug=${category.slug}`}
                          as={`/${category.slug}`}
                        >
                          <a
                            className="blog__body__wrapper__sub-content__categories__category__link"
                            href={`/${category.slug}`}
                          >
                            <HoverDivAnimation
                              title={category.name}
                            ></HoverDivAnimation>
                          </a>
                          {/* {course.name} ({course.classes}) */}
                        </Link>
                      </div>
                    );
                  })}
                </div>

                <div className="blog__body__wrapper__sub-content__latest-posts">
                  <div className="blog__body__wrapper__sub-content__title">
                    Bài viết
                  </div>
                  {this.state.latestNews.map((news, index) => {
                    return (
                      <div
                        key={index}
                        className="blog__body__wrapper__sub-content__latest-posts__post"
                      >
                        <LatestPost latestPost={news} />
                      </div>
                    );
                  })}
                </div>
                <div className="blog__body__wrapper__sub-content__email">
                  <div className="blog__body__wrapper__sub-content__title">
                    Liên hệ
                  </div>
                  <p className="blog__body__wrapper__sub-content__email__content">
                    Liên hệ để biết thêm thông tin về khoá học của chúng tôi.
                  </p>
                  <SearchBox type="email" />
                </div>
              </div>
            </div>

            <div className="blog__body__contact-us">
              <ContactUs
                {...this.props.setting.contact}
                addContact={this.addContact}
                courses={this.props.courses.items}
              />
            </div>
          </div>

          <Footer
            {...this.props.setting.contact}
            social={this.props.setting.social}
            logo={this.props.setting.logo}
          />
        </React.Fragment>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchCourse: action.course.fetch,
      fetchSetting: action.setting.fetch,
      fetchNewCategory: action.newCategory.fetch,
      addContact: action.contact.add,
      addContactRefresh: action.contact.addRefresh
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Blog);

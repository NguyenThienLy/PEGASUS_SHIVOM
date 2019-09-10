import React from "react";

import Head from "next/head";
import Link from "next/link";
import { connect } from "react-redux";
import { api } from "../../services";
import { action } from "../../actions";
import { bindActionCreators } from "redux";

import {
  Header,
  Footer,
  ContactUs,
  News2,
  SearchBox,
  LatestPost
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
    try {
      // Lấy ra object category theo slug
      const category = await api.newCategory.getNewsCategoryBySlug(slug);

      // Lấy danh sách các tin tức theo category
      const res = await api.news.getList({
        query: {
          filter: { category: category._id }
        },
        populates: [{ path: "author", select: "firstName%20lastName" }]
      });

      return { lstNews: res.results.objects.rows, category: category };
    } catch (error) {}

    return {};
  }
  async componentDidMount() {
    var heightOfFooter = $(".blog__footer .footer-wrapper").height();
    $(".blog__contact-us").css("margin-bottom", heightOfFooter + "px");
  }
  render() {
    return (
      <div>
        <Head>
          <title>Các bài viết</title>
          <meta name="title" content="Blog" />
          <meta name="description" content="Blog công ty công nghệ Pegasus" />
        </Head>
        <Header {...this.props} />
        <React.Fragment>
          <div className="blog__path">
            <a href="http://hiephoayoga.com">trang chủ</a> / <a>các bài viết</a>
          </div>
          <div className="blog">
            <div className="blog__wrapper">
              <div className="blog__wrapper__main-content">
                {this.props.lstNews.map((news2, index) => {
                  news2.category = this.props.category;

                  return (
                    <div>
                      <News2 key={index} news2={news2}></News2>
                    </div>
                  );
                })}
                {/* {this.state.new2.map((item, index) => {
                  return (
                    <div key={index}>
                      <News2 news2={item}></News2>
                    </div>
                  );
                })} */}
              </div>
              <div className="blog__wrapper__sub-content">
                <div className="blog__wrapper__sub-content__search">
                  <SearchBox type="search" />
                </div>
                <div className="blog__wrapper__sub-content__social-group">
                  <SocialGroup />
                </div>
                <div className="blog__wrapper__sub-content__categories">
                  <div className="blog__wrapper__sub-content__categories__text">
                    Thể loại
                  </div>
                  {this.state.categories.map((category, index) => {
                    return (
                      <div
                        key={index}
                        className="blog__wrapper__sub-content__categories__category"
                      >
                        {category.name} ({category.classes})
                      </div>
                    );
                  })}
                </div>
                <div className="blog__wrapper__sub-content__latest-posts">
                  <div className="blog__wrapper__sub-content__categories__text">
                    bài viết
                  </div>
                  {this.state.latestPost.map((post, index) => {
                    return (
                      <div
                        key={index}
                        className="blog__wrapper__sub-content__latest-posts__post"
                      >
                        <LatestPost latestPost={post} />
                      </div>
                    );
                  })}
                </div>
                <div className="blog__wrapper__sub-content__email">
                  <div className="blog__wrapper__sub-content__categories__text">
                    Liên hệ
                  </div>
                  <p>
                    Liên hệ để biết thêm thông tin về khoá học của chúng tôi.
                  </p>
                  <SearchBox type="email" />
                </div>
              </div>
            </div>
            <div className="blog__contact-us">
              <ContactUs />
            </div>
          </div>
        </React.Fragment>
        <div className="blog__footer">
          <Footer />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Blog);

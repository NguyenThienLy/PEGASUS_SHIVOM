import * as React from "react";

import Head from "next/head";
import Link from "next/link";
import { connect } from "react-redux";
import { api } from "../../services";
import { action } from "../../actions";
import { bindActionCreators } from "redux";

import Swal from "sweetalert2";
import "./allCourses.scss";
import {
  Header,
  Footer,
  ContactUs,
  TrainingClass,
  SearchBox,
  LatestPost,
  HoverDivAnimation
} from "../../components";
import { SocialGroup } from "../../components/footer/socialGroup/socialGroup";

import GoogleMapReact from "google-map-react";

export class AllCourses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trainingClasses: [
        {
          category: "fitness",
          name: "chạy bộ",
          detail: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
          time: "1 Giờ",
          star: 1,
          love: 800,
          image:
            "https://dalia.elated-themes.com/wp-content/uploads/2018/06/fitness-home-event-list-2a.jpg",
          link: "#"
        },
        {
          category: "fitness",
          name: "chạy bộ",
          detail: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
          time: "1 Giờ",
          star: 1,
          love: 800,
          image:
            "https://dalia.elated-themes.com/wp-content/uploads/2018/06/fitness-home-event-list-2a.jpg",
          link: "#"
        },
        {
          category: "fitness",
          name: "chạy bộ",
          detail: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
          time: "1 Giờ",
          star: 1,
          love: 800,
          image:
            "https://dalia.elated-themes.com/wp-content/uploads/2018/06/fitness-home-event-list-2a.jpg",
          link: "#"
        },
        {
          category: "fitness",
          name: "chạy bộ",
          detail: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
          time: "1 Giờ",
          star: 1,
          love: 800,
          image:
            "https://dalia.elated-themes.com/wp-content/uploads/2018/06/fitness-home-event-list-2a.jpg",
          link: "#"
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
      ],
      latestNews: []
    };
  }
  static async getInitialProps({ req, query }) {
    return {};
  }

  handleScroll = () => {
    var x = $(window).scrollTop();
    $(".all-courses .all-courses__body__title").css(
      "background-position",
      "center " + parseInt(-x / 2.8) + "px"
    );
  };

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }
  fetchData() {
    if (this.props.courses.items.length === 0) {
      this.props.fetchCourse({
        query: {
          filter: {
            status: "active"
          }
        }
      });
    }
    if (!this.props.setting.fetched) {
      this.props.fetchSetting({
        query: {
          filter: {
            status: "active"
          }
        }
      });
    }
    if (this.props.newCategories.items.length === 0) {
      this.props.fetchNewCategory({
        query: {
          filter: {
            status: "active"
          }
        }
      });
    }
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
  componentDidMount() {
    this.fetchData();
    this.handleScroll();
    window.addEventListener("scroll", this.handleScroll);
    this.getLatestNews();
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
  addContact = body => {
    this.props.addContact(body);
  };
  render() {
    return (
      <div className="all-courses">
        <Head>
          <title>Các khoá học</title>
          <meta name="title" content="Các khoá học" />
          <meta
            name="description"
            content="Các khoá học của trung tâm yoga Hiệp Hoà"
          />
        </Head>
        <React.Fragment>
          <div className="background-overlay"></div>
          <Header {...this.props} />

          <div className="all-courses__body">
            <div className="all-courses__body__title">
              <div className="all-courses__body__title__image">
                <img src="https://dalia.elated-themes.com/wp-content/uploads/2018/07/spa-slider-1.jpg"></img>
                <div className="all-courses__body__title__image__info">
                  <div>các khoá học </div>
                  <p>Tham khảo các khoá học hiện có của Hiệp Hoà Yoga.</p>
                </div>
              </div>
              <div className="all-courses__body__title__inner">
                <div>các khoá học</div>
                <p>Tham khảo các khoá học hiện có của Hiệp Hoà Yoga.</p>
              </div>
            </div>

            <div className="all-courses__body__wrapper">
              <div className="all-courses__body__wrapper__main-content">
                <div className="all-courses__body__wrapper__main-content__search">
                  <SearchBox type="search" />
                </div>
                {this.props.courses.fetching === false
                  ? this.props.courses.items.map((trainingClass, index) => {
                    return (
                      <TrainingClass
                        trainingClass={trainingClass}
                        key={index}
                      />
                    );
                  })
                  : null}
              </div>

              <div className="all-courses__body__wrapper__sub-content">
                <div className="all-courses__body__wrapper__sub-content__search">
                  <SearchBox type="search" />
                </div>
                <div className="all-courses__body__wrapper__sub-content__social-group">
                  {this.props.setting.social ? (
                    <SocialGroup social={this.props.setting.social} />
                  ) : null}
                </div>

                <div className="all-courses__body__wrapper__sub-content__title">
                  Tin tức
                </div>
                <div className="all-courses__body__wrapper__sub-content__categories">
                  {this.props.newCategories.items.map((category, index) => {
                    return (
                      <div
                        className="all-courses__body__wrapper__sub-content__categories__category"
                        key={index}
                      >
                        <Link
                          href={`/blog/blog?categorySlug=${category.slug}`}
                          as={`/${category.slug}`}
                        >
                          <a
                            className="all-courses__body__wrapper__sub-content__categories__category__link"
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

                <div className="all-courses__body__wrapper__sub-content__latest-posts">
                  <div className="all-courses__body__wrapper__sub-content__title">
                    bài viết
                  </div>
                  {this.state.latestNews.map((post, index) => {
                    return (
                      <div
                        key={index}
                        className="all-courses__body__wrapper__sub-content__latest-posts__post"
                      >
                        <LatestPost latestPost={post} />
                      </div>
                    );
                  })}
                </div>

                <div className="all-courses__body__wrapper__sub-content__email">
                  <div className="all-courses__body__wrapper__sub-content__title">
                    Liên hệ
                  </div>
                  <p className="all-courses__body__wrapper__sub-content__email__content">
                    Liên hệ để biết thêm thông tin về khoá học của chúng tôi.
                  </p>
                  <SearchBox type="email" />
                </div>
              </div>
            </div>
            <div className="all-courses__body__contact-us">
              <ContactUs
                {...this.props.setting.contact}
                addContact={this.addContact}
                courses={this.props.courses.items}
              />
            </div>
          </div>

          <Footer
            {...this.props.setting.contact}
            logo={this.props.setting.logo}
            social={this.props.setting.social}
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
)(AllCourses);

import * as React from "react";
import { connect } from "react-redux";
import Head from "next/head";
import Link from "next/link";
import { action } from "../../actions";
import { api } from "../../services";
import { bindActionCreators } from 'redux';

import "./home.scss";
import {
  Footer,
  Header,
  TimeTable,
  TrainingClass,
  News,
  ContactUs,
  Trainer,
  Review,
  IntroHome,
  Slider,
  TrainerInfo,
  NumberSection,
  PostAuthor,
  EventHour,
  LatestPost,
  IntroHome2,
  News2,
  NumberAdmin,
  ProfileAdmin,
  RingingPhone,
  RelatedPost,
  Table,
  LineChart,
  PieChart,
  Sidebar,
  Feedback,
  ImageShow,
  FeedbackNoti,
  Activity,
  Map
} from "../../components";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      center: {
        lat: 59.95,
        lng: 30.33
      },
      zoom: 11,
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
      news: {
        image:
          "https://dalia.elated-themes.com/wp-content/uploads/2018/06/fitness-img-1.jpg",
        link: "#",
        category: "lorem ipsum",
        title: "certified health professionals",
        content:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate inventore similique, autem, eius dolore iure numquam a deserunt officia, quisquam velit nostrum ea cum. Nisi nam corporis alias quo qui.",
        button: "read more"
      },
      trainers: [
        {
          image:
            "https://dalia.elated-themes.com/wp-content/uploads/2018/06/team2-img-8-768x766.jpg",
          link: "#",
          type: "physiotherapist",
          name: "jessica fox",
          facebook: "facebook.com",
          twitter: "twitter.com",
          instagram: "instagram.com"
        },
        {
          image:
            "https://dalia.elated-themes.com/wp-content/uploads/2018/06/team2-img-2-768x766.jpg",
          link: "#",
          type: "fitness trainer",
          name: "christine johanson",
          facebook: "facebook.com",
          twitter: "twitter.com",
          instagram: "instagram.com"
        },
        {
          image:
            "https://dalia.elated-themes.com/wp-content/uploads/2018/06/team2-img-3-768x766.jpg",
          link: "#",
          type: "personal trainer",
          name: "lana tailor",
          facebook: "facebook.com",
          twitter: "twitter.com",
          instagram: "instagram.com"
        }
      ],
      reviews: [
        {
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlp9UWxfO8gXd-LjSk2RhNeCrWXwJy69ruhejIsIY9Zw_HqDsxBQ",
          content:
            "1 Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate inventore similique, autem, eius dolore iure numquam a deserunt officia, quisquam velit nostrum ea cum.",
          owner: "callie hern"
        },
        {
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlp9UWxfO8gXd-LjSk2RhNeCrWXwJy69ruhejIsIY9Zw_HqDsxBQ",
          content:
            "2 Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate inventore similique, autem, eius dolore iure numquam a deserunt officia, quisquam velit nostrum ea cum.",
          owner: "callie hern"
        },
        {
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlp9UWxfO8gXd-LjSk2RhNeCrWXwJy69ruhejIsIY9Zw_HqDsxBQ",
          content:
            "3 Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate inventore similique, autem, eius dolore iure numquam a deserunt officia, quisquam velit nostrum ea cum.",
          owner: "callie hern"
        },
        {
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlp9UWxfO8gXd-LjSk2RhNeCrWXwJy69ruhejIsIY9Zw_HqDsxBQ",
          content:
            "4 Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate inventore similique, autem, eius dolore iure numquam a deserunt officia, quisquam velit nostrum ea cum.",
          owner: "callie hern"
        },
        {
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlp9UWxfO8gXd-LjSk2RhNeCrWXwJy69ruhejIsIY9Zw_HqDsxBQ",
          content:
            "5 Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate inventore similique, autem, eius dolore iure numquam a deserunt officia, quisquam velit nostrum ea cum.",
          owner: "callie hern"
        },
        {
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlp9UWxfO8gXd-LjSk2RhNeCrWXwJy69ruhejIsIY9Zw_HqDsxBQ",
          content:
            "6 Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate inventore similique, autem, eius dolore iure numquam a deserunt officia, quisquam velit nostrum ea cum.",
          owner: "callie hern"
        }
      ],
      introHome: [
        {
          link: "#",
          image:
            "https://dalia.elated-themes.com/wp-content/uploads/2018/06/fitness-home-icon-img-1.png",
          title: "run outdoors",
          content:
            "Lorem ipsum dolor sit amet, ad duo adipisci imperdiet, eum eu fugit."
        },
        {
          link: "#",
          image:
            "https://dalia.elated-themes.com/wp-content/uploads/2018/06/fitness-home-icon-img-4.png",
          title: "rollerblading",
          content:
            "Lorem ipsum dolor sit amet, ad duo adipisci imperdiet, eum eu fugit."
        },
        {
          link: "#",
          image:
            "https://dalia.elated-themes.com/wp-content/uploads/2018/06/fitness-home-icon-img-5.png",
          title: "mountain biking",
          content:
            "Lorem ipsum dolor sit amet, ad duo adipisci imperdiet, eum eu fugit."
        }
      ],
      eventHour: {
        weekday: "monday",
        timeStart: "15.00",
        timeEnd: "16.00",
        trainer: "alice hattaway"
      },
      latestPost: {
        link: "#",
        image:
          "https://dalia.elated-themes.com/wp-content/uploads/2018/05/blog-img-6-150x150.jpg",
        title: "clean beauty",
        date: "13th jun"
      },
      news2: {
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
        button: "read more"
      },
      numberAdmin: {
        icon: '<i class="fas fa-id-card-alt"></i>',
        about: "booking",
        quantity: 184
      },
      profileAdmin: {
        image:
          "https://dalia.elated-themes.com/wp-content/uploads/2018/06/team2-img-8.jpg",
        name: "nisha sharma",
        phone: "0947161096",
        email: "nisha_sharma@gmail.com",
        location: "remote",
        age: 25,
        facebook: "facebook.com",
        twitter: "twitter.com",
        instagram: "instagram.com"
      }
    };
  }
  static async getInitialProps({ req, query }) {
    return {};
  }
  fetchData = () => {
    // Cách 1
    this.props.fetchSlider()
    this.props.fetchCourse()
    this.props.fetchTesmonial({
      query: {
        filter: { status: "active" }
      }
    })
    this.props.fetchTeacher()
    this.props.fetchMasonryHome({
      query: {
        filter: { status: "active" },
        limit: 6
      }
    })
    this.props.fetchSetting()
    this.props.fetchTimeTable({
      query: {
        limit: 0
      }
    })
    // Luôn luôn phải catch lỗi và xử lý nhằm tránh crash web
    // Cách 2
    // api.class.getList()
    //   .then(result => {
    //     console.log("result: ", result)
    //   })
    //   .catch(err => {
    //     console.log("Err: ", err)
    //   })
    // // Cách 3
    // try {
    //   const result = await api.class.getList();
    // } catch (err) { }
  }
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.tesmonials.fetching === false) {
      $(".home__body__reviews__slick-autoplay").not('.slick-initialized').slick({
        dots: true,
        arrows: false,
        slidesToShow: 3,
        slidesToScroll: 3,
        autoplay: true,
        autoplaySpeed: 5000,
        responsive: [
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              infinite: true,
              dots: true
            }
          }
        ]
      });
      $(".home__body__reviews__slick-autoplay").on("beforeChange", function (
        event,
        slick,
        currentSlide,
        nextSlide
      ) {
        $(".home__body__reviews__slick-autoplay .slick-dots li").removeClass(
          "slick-active"
        );
        $(".home__body__reviews__slick-autoplay .slick-dots li button")
          .attr("aria-pressed", "false")
          .focus(function () {
            this.blur();
          });
      });
    }
  }
  async componentDidMount() {

    this.fetchData();


    $(".home__body__brands__slick-autoplay").not('.slick-initialized').slick({
      dots: false,
      arrows: false,
      slidesToShow: 6,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
      responsive: [
        {
          breakpoint: 1400,
          settings: {
            slidesToShow: 5,
            slidesToScroll: 1,
            infinite: true,
            dots: false
          }
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        }
      ]
    });
    $(".home__body__brands__slick-autoplay").on("beforeChange", function (
      event,
      slick,
      currentSlide,
      nextSlide
    ) {
      $(".home__body__brands__slick-autoplay .slick-dots li").removeClass(
        "slick-active"
      );
      $(".home__body__brands__slick-autoplay .slick-dots li button")
        .attr("aria-pressed", "false")
        .focus(function () {
          this.blur();
        });
    });

    $(".home__body__intro-slick-autoplay").not('.slick-initialized').slick({
      dots: true,
      arrows: false,
      slidesToShow: 2,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 5000,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            dots: true,
            arrows: false
          }
        }
      ]
    });
    $(".home__body__intro-slick-autoplay").on("beforeChange", function (
      event,
      slick,
      currentSlide,
      nextSlide
    ) {
      $(".home__body__intro-slick-autoplay .slick-dots li").removeClass(
        "slick-active"
      );
      $(".home__body__intro-slick-autoplay .slick-dots li button")
        .attr("aria-pressed", "false")
        .focus(function () {
          this.blur();
        });
    });
  }

  addContact = (body) => {
    this.props.addContact(body)
  }


  render() {
    return (
      <div className="home">
        <Head>
          <title> Trang chủ </title>
          <meta name="title" content="Trang chủ" />
          <meta name="description" content="Hiệp Hoà Yoga nơi yoga chính thống được hội tụ cùng đội ngũ giáo viên tâm huyết" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          ></meta>
        </Head>
        <React.Fragment>
          <div class="background-overlay"></div>
          <Header {...this.props} logo={this.props.setting.logo} />

          <div className="home__body">
            <div className="home__body__slider">
              {this.props.sliders.fetching === false ? <Slider {...this.props.sliders} /> : null}
            </div>

            <div className="home__body__intro">
              {this.state.introHome.map(intro => {
                return <IntroHome introHome={intro}></IntroHome>;
              })}
            </div>
            <div className="home__body__intro-slick-autoplay">
              {this.state.introHome.map(intro => {
                return (
                  <div className="home__body__intro-slick-autoplay__item">
                    <IntroHome introHome={intro}></IntroHome>
                  </div>
                );
              })}
            </div>

            <div className="home__body__trainingClass">
              <div className="home__body__trainingClass__title">
                <div className="home__body__trainingClass__title__inner">
                  <div>Khoá học yoga</div>
                  <p>
                    Lorem ipsum dolor sit amet, animal utamur id nec, clita
                    doming oblique usu cu, utroque omittam summ.
                  </p>
                </div>
              </div>
              <div className="home__body__trainingClass__content">
                {this.props.courses.fetching === false ? this.props.courses.items.map(trainingClass => {
                  return <TrainingClass trainingClass={trainingClass} />;
                }) : null}
                {/* {this.state.trainingClasses.map(trainingClass => {
                  return <TrainingClass trainingClass={trainingClass} />;
                })} */}
              </div>
            </div>

            <div className="home__body__imageShow">
              <ImageShow {...this.props.masonryHomes} />
            </div>

            <div className="home__body__timeTable">
              <div className="home__body__timeTable__title">
                <div className="home__body__timeTable__title__inner">
                  <div>amazing classes</div>
                  <p>
                    Lorem ipsum dolor sit amet, quod gloriatur inciderint at
                    vel, ei justo dolore virtute duo. Movet quaeque probatus an
                    sit, mel iisque facilisi et.
                  </p>
                </div>
              </div>
              <div className="home__body__timeTable__content">
                {this.props.timeTable.fetching === false ? <TimeTable {...this.props.timeTable.items} /> : null}
              </div>
            </div>

            <div className="home__body__news">
              <div className="home__body__news__container">
                <News news={this.state.news} />
              </div>
            </div>

            <div className="home__body__reviews">
              <div className="home__body__reviews__introduction">
                <div className="home__body__reviews__introduction__inner">
                  <div>Học viên nói gì</div>
                  <p>
                    Những lời chia sẻ từ kinh nghiệm của học viên trung tâm hy vọng sẽ giúp các bạn
                    hiểu hơn về Hiệp Hoà Yoga, nơi yoga chính thống được phát triển và truyền đạt bởi
                    những người tâm huyết
                  </p>
                </div>
              </div>
              {this.props.tesmonials.fetching === false ?
                <div className="home__body__reviews__slick-autoplay">
                  {this.props.tesmonials.items.map(review => {
                    return (
                      <div className="home__body__reviews__slick-autoplay__item">
                        <Review review={review} />
                      </div>
                    );
                  })}
                  {/* {this.state.reviews.map(review => {
                  return (
                    <div className="home__body__reviews__slick-autoplay__item">
                      <Review review={review} />
                    </div>
                  );
                })} */}
                </div> : null}
            </div>

            <div className="home__body__numbers">
              <div className="home__body__numbers__item">
                <NumberSection />
              </div>
              <div className="home__body__numbers__item">
                <NumberSection />
              </div>
              <div className="home__body__numbers__item">
                <NumberSection />
              </div>
              <div className="home__body__numbers__item">
                <NumberSection />
              </div>
            </div>

            <div className="home__body__trainers">
              <div className="home__body__trainers__introduction">
                <div className="home__body__trainers__introduction__inner">
                  <div>Đội ngũ giáo viên</div>
                  <p>
                    Lorem ipsum dolor sit amet, animal utamur id nec, clita
                    doming oblique usu cu, utroque omittam ex sea inani
                    eleifend.
                  </p>
                </div>
              </div>
              <div className="home__body__trainers__background">
                <div>instructor</div>
              </div>
              <div className="home__body__trainers__list">
                {this.props.teachers.fetching === false ? this.props.teachers.items.map(trainer => {
                  return <Trainer trainer={trainer} />
                }) : null}
                {/* {this.state.trainers.map(trainer => {
                  return <Trainer trainer={trainer} />;
                })} */}
              </div>
            </div>

            <div className="home__body__brands">
              <div className="home__body__brands__slick-autoplay">
                <div className="home__body__brands__slick-autoplay__item">
                  <img src="https://dalia.elated-themes.com/wp-content/uploads/2018/05/client-6.png"></img>
                </div>
                <div className="home__body__brands__slick-autoplay__item">
                  <img src="https://dalia.elated-themes.com/wp-content/uploads/2018/05/client-7.png"></img>
                </div>
                <div className="home__body__brands__slick-autoplay__item">
                  <img src="https://dalia.elated-themes.com/wp-content/uploads/2018/05/client-8.png"></img>
                </div>
                <div className="home__body__brands__slick-autoplay__item">
                  <img src="https://dalia.elated-themes.com/wp-content/uploads/2018/05/client-5.png"></img>
                </div>
                <div className="home__body__brands__slick-autoplay__item">
                  <img src="https://dalia.elated-themes.com/wp-content/uploads/2018/05/client-2.png"></img>
                </div>
                <div className="home__body__brands__slick-autoplay__item">
                  <img src="https://dalia.elated-themes.com/wp-content/uploads/2018/05/client-3.png"></img>
                </div>
              </div>
            </div>

            <div className="home__body__map">
              <Map
                id="myMap"
                options={{
                  center: { lat: 21.3518757, lng: 105.9701969 },
                  zoom: 15
                }}
                onMapLoad={map => {
                  var marker = new window.google.maps.Marker({
                    position: { lat: 21.3518757, lng: 105.9701969 },
                    map: map,
                    title: "Hiệp Hoà Yoga"
                  });
                }}
              />
            </div>

            <div className="home__body__contactUs">
              <ContactUs {...this.props.setting.contact} addContact={this.addContact} courses={this.props.courses.items} />
            </div>
          </div>

          <Footer {...this.props.setting.contact} logo={this.props.setting.logo} />
        </React.Fragment>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

// const mapDispatchToProps = dispatch => {
//   return {
//     addContact: (body, option = {}) => dispatch(action.contact.add(body, option)),
//     fetchClass: (option = {}) => dispatch(action.class.fetch(option)),
//     fetchSlider: (option = {}) => dispatch(action.slider.fetch(option)),
//     fetchCourse: (option = {}) => dispatch(action.course.fetch(option)),
//     fetchTesmonial: (option = {}) => dispatch(action.tesmonial.fetch(option)),
//     fetchTeacher: (option = {}) => dispatch(action.teacher.fetch(option)),
//     fetchMasonryHome: (option = {}) => dispatch(action.masonryHome.fetch(option)),
//     fetchSetting: (option = {}) => dispatch(action.setting.fetch(option)),
//     fetchTimeTable: (option = {}) => dispatch(action.timeTable.fetch(option))
//   }
// }

const mapDispatchToProps = dispatch => bindActionCreators({
  addContact: action.contact.add,
  fetchClass: action.class.fetch,
  fetchSlider: action.slider.fetch,
  fetchCourse: action.course.fetch,
  fetchTesmonial: action.tesmonial.fetch,
  fetchTeacher: action.teacher.fetch,
  fetchMasonryHome: action.masonryHome.fetch,
  fetchSetting: action.setting.fetch,
  fetchTimeTable: action.timeTable.fetch,
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps)(Home);

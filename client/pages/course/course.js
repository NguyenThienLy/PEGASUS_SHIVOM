import * as React from "react";

import Head from "next/head";
import Link from "next/link";
import { connect } from "react-redux";
import { api } from "../../services";
import { action } from "../../actions";

import "./course.scss";
import { Header, Footer, TrainerInfo, ContactUs, RingingPhone, RelatedPost } from "../../components";
import { SocialGroup } from "../../components/footer/socialGroup/socialGroup"
export class Course extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      course: {
        image:
          'https://dalia.elated-themes.com/wp-content/uploads/2018/06/fitness-home-event-list-3a.jpg',
        dateCreated: {
          day: "7th",
          month: "jun"
        },
        author: 'jane skim',
        title: 'Sketching',
        content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quas consectetur, amet voluptatum, natus eum dolore ex aspernatur assumenda vel magni iusto praesentium dolores ad aliquam tempora obcaecati quae, commodi totam.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quas consectetur, amet voluptatum, natus eum dolore ex aspernatur assumenda vel magni iusto praesentium dolores ad aliquam tempora obcaecati quae, commodi totam.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quas consectetur, amet voluptatum, natus eum dolore ex aspernatur assumenda vel magni iusto praesentium dolores ad aliquam tempora obcaecati quae, commodi totam.',
        targets: ['Giảm cân', 'Tăng sức khoẻ', 'Tăng trí nhớ', 'Tăng sức mạnh tim mạch', 'Đẩy lui bệnh tật', 'tịnh tâm', 'giữ gìn sắc đẹp'],
        classes: [
          {
            date: 'Tuesday',
            starttime: '18h00',
            endtime: '19h00',
            teacher: 'Ngọc Hạnh'
          },
          {
            date: 'Thursday',
            starttime: '19h00',
            endtime: '20h00',
            teacher: 'Ngọc Hạnh'
          },
          {
            date: 'Friday',
            starttime: '20h00',
            endtime: '21h00',
            teacher: 'Ngọc Hạnh'
          }
        ],
      },
      trainerInfo: {
        name: 'ngọc hạnh',
        avatar: 'https://dalia.elated-themes.com/wp-content/uploads/2018/06/makeup-image-gallery-2.jpg',
        shortDescription: 'lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores sapiente magnam possimus libero deserunt.',
        age: 21,
        weight: '50kg',
        height: '1m62',
        position: 'giáo viên'
      },
      otherCourses: [
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


    };
  }
  static async getInitialProps({ req, query }) {
    return {};
  }
  async componentDidMount() {
    var heightOfFooter = $(".course__footer .footer-wrapper").height();
    $(".course__contact-us").css("margin-bottom", heightOfFooter + "px");
  }
  render() {
    return (
      <div className="course">
        <Head>
          <title>Khoá học</title>
          <meta name="title" content="Khoá học" />
          <meta name="description" content="Khoá học về yoga" />
        </Head>
        <Header {...this.props} />
        <React.Fragment>
          <div className="course-title">
            {this.state.course.title}
          </div>
          <div className="course-ringing-phone">
            <RingingPhone />
          </div>
          <div className="course-wrapper">


            <div className="course-wrapper__main-content">



              <div className="course-wrapper__main-content__image">
                <div className="course-wrapper__main-content__image__dateCreated">
                  <a>
                    <span className="course-wrapper__main-content__image__dateCreated__day">
                      {this.state.course.dateCreated.day}
                    </span>
                    <span className="course-wrapper__main-content__image__dateCreated__month">
                      {this.state.course.dateCreated.month}
                    </span>
                  </a>
                </div>
                <img src={this.state.course.image} alt="" />
              </div>



              <div className="course-wrapper__main-content__author">
                {this.state.course.author}
              </div>
              <div className="course-wrapper__main-content__title">
                {this.state.course.title}
              </div>
              <div className="course-wrapper__main-content__content">
                {this.state.course.content}
              </div>
              <div className="course-wrapper__main-content__targets">
                {
                  this.state.course.targets.map((target, index) => {
                    return (
                      <div className="course-wrapper__main-content__targets__target" key={index}>
                        <i className="fas fa-check"></i>
                        {target}
                      </div>
                    )
                  })
                }
              </div>
              <div className="course-wrapper__main-content__text">
                Giáo viên
              </div>
              <div className="course-wrapper__main-content__trainer-info">
                <TrainerInfo trainerInfo={this.state.trainerInfo} />
              </div>
              <div className="course-wrapper__main-content__text">
                Lớp học <span>({this.state.course.classes.length})</span>
              </div>
              <div className="course-wrapper__main-content__classes">
                {
                  this.state.course.classes.map((yogaclass, index) => {
                    return (
                      <div key={index} className="course-wrapper__main-content__classes__yogaclass">
                        <h4>{yogaclass.date}</h4>
                        <h4>{yogaclass.starttime} - {yogaclass.endtime}</h4>
                        <p>{yogaclass.teacher}</p>
                      </div>
                    );
                  })
                }
              </div>

            </div>
            <div className="course-wrapper__sub-content">
              <div className="course-wrapper__sub-content__social-group">
                <SocialGroup />
              </div>
              <div className="course-wrapper__sub-content__other-courses">
                <div className="course-wrapper__sub-content__other-courses__text">
                  Các khoá học
                </div>
                {
                  this.state.otherCourses.map((course) => {
                    return (
                      <div className="course-wrapper__sub-content__other-courses__course">
                        {course.name} ({course.classes})
                      </div>
                    )
                  })
                }
              </div>
              <div className="course-wrapper__sub-content__related-post">
                <div className="course-wrapper__sub-content__other-courses__text">
                  bài viết
                </div>

              </div>
            </div>
          </div>
          <div className="course__contact-us">
            <ContactUs />
          </div>
        </React.Fragment>
        <div className="course__footer">
          <Footer />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps)(Course);

import * as React from "react";

import Head from "next/head";
import Link from "next/link";
import { connect } from "react-redux";
import { api } from "../../services";
import { action } from "../../actions";
import { bindActionCreators } from 'redux';

import Swal from 'sweetalert2'

import "./contact.scss";
import { Header, Footer, IntroHome2, ContactUs, Map } from "../../components";
import GoogleMapReact from "google-map-react";

export class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      intro: [
        {
          image:
            "https://dalia.elated-themes.com/wp-content/uploads/2018/05/h1-icon-img-1.png",
          title: "the thermal bath",
          content:
            "Lorem ipsum dolor sit amet, ad duo adipisci imperdiet, eum eu fugit."
        },
        {
          image:
            "https://dalia.elated-themes.com/wp-content/uploads/2018/05/h1-icon-img-2.png",
          title: "relaxing massage",
          content:
            "Lorem ipsum dolor sit amet, ad duo adipisci imperdiet, eum eu fugit."
        },
        {
          image:
            "https://dalia.elated-themes.com/wp-content/uploads/2018/05/h1-icon-img-3.png",
          title: "body treatments",
          content:
            "Lorem ipsum dolor sit amet, ad duo adipisci imperdiet, eum eu fugit."
        },
        {
          image:
            "https://dalia.elated-themes.com/wp-content/uploads/2018/05/h1-icon-img-4.png",
          title: "supreme skincare",
          content:
            "Lorem ipsum dolor sit amet, ad duo adipisci imperdiet, eum eu fugit."
        }
      ],
      center: {
        lat: 59.95,
        lng: 30.33
      },
      zoom: 11
    };
  }
  static async getInitialProps({ req, query }) {
    return {};
  }
  handleScroll = () => {
    var x = $(window).scrollTop();
    $(".contact .contact__body__title").css(
      "background-position",
      "center " + parseInt(-x / 2.8) + "px"
    );
  };
  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.contacts.isAddSuccess && !prevProps.contacts.isAddSuccess) {
      Swal.fire("Thành công", 'Gửi liên hệ thành công', 'success')
      this.props.addContactRefresh()
    }
    if (this.props.contacts.isAddError && prevProps.contacts.adding) {
      Swal.fire("Thất bại", 'Gửi liên hệ không thành công', 'error')
      this.props.addContactRefresh()
    }
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
  componentDidMount() {
    this.fetchData()
    this.handleScroll();
    window.addEventListener("scroll", this.handleScroll);

    $(".contact__body__brands__slick-autoplay").slick({
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
    $(".contact__body__brands__slick-autoplay").on("beforeChange", function (
      event,
      slick,
      currentSlide,
      nextSlide
    ) {
      $(".contact__body__brands__slick-autoplay .slick-dots li").removeClass(
        "slick-active"
      );
      $(".contact__body__brands__slick-autoplay .slick-dots li button")
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
      <div className="contact">
        <Head>
          <title>Liên hệ</title>
          <meta name="title" content="Liên hệ" />
          <meta name="description" content="Liên hệ trung tâm yoga Hiệp Hòa" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          ></meta>
        </Head>
        <React.Fragment>
          <div className="background-overlay"></div>
          <Header {...this.props} logo={this.props.setting.logo} />

          <div className="contact__body">
            <div className="contact__body__title">
              <div className="contact__body__title__image">
                <img src="https://dalia.elated-themes.com/wp-content/uploads/2018/06/about-us-title-img.jpg"></img>
                <div className="contact__body__title__image__info">
                  <div>about us</div>
                  <p>
                    Lorem ipsum dolor sit amet, animal utamur id nec, clita
                    doming oblique usu cu, utroque omittam summ.
                  </p>
                </div>
              </div>
              <div className="contact__body__title__inner">
                <div>about us</div>
                <p>
                  Lorem ipsum dolor sit amet, animal utamur id nec, clita doming
                  oblique usu cu, utroque omittam summ.
                </p>
              </div>
            </div>
            <div className="contact__body__intro">
              {this.state.intro.map((intro, index) => {
                return <IntroHome2 introHome2={intro} key={index}></IntroHome2>;
              })}
            </div>
            <div className="contact__body__brands">
              <div className="contact__body__brands__slick-autoplay">
                <div className="contact__body__brands__slick-autoplay__item">
                  <img src="https://dalia.elated-themes.com/wp-content/uploads/2018/05/client-6.png"></img>
                </div>
                <div className="contact__body__brands__slick-autoplay__item">
                  <img src="https://dalia.elated-themes.com/wp-content/uploads/2018/05/client-7.png"></img>
                </div>
                <div className="contact__body__brands__slick-autoplay__item">
                  <img src="https://dalia.elated-themes.com/wp-content/uploads/2018/05/client-8.png"></img>
                </div>
                <div className="contact__body__brands__slick-autoplay__item">
                  <img src="https://dalia.elated-themes.com/wp-content/uploads/2018/05/client-5.png"></img>
                </div>
                <div className="contact__body__brands__slick-autoplay__item">
                  <img src="https://dalia.elated-themes.com/wp-content/uploads/2018/05/client-2.png"></img>
                </div>
                <div className="contact__body__brands__slick-autoplay__item">
                  <img src="https://dalia.elated-themes.com/wp-content/uploads/2018/05/client-3.png"></img>
                </div>
              </div>
            </div>
            <div className="contact__body__map">
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
            <div className="contact__body__contactUs">
              <ContactUs {...this.props.setting.contact} addContact={this.addContact} courses={this.props.courses.items} />
            </div>
          </div>

          <Footer {...this.props.setting.contact} logo={this.props.setting.logo} social={this.props.setting.social} />
        </React.Fragment>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
};
const mapDispatchToProps = dispatch => bindActionCreators({
  fetchCourse: action.course.fetch,
  fetchSetting: action.setting.fetch,
  fetchNewCategory: action.newCategory.fetch,
  addContact: action.contact.add,
  addContactRefresh: action.contact.addRefresh
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps)(Contact);

import * as React from "react";

import Head from "next/head";
import Link from "next/link";
import { connect } from "react-redux";
import { api } from "../../services";
import { action } from "../../actions";

import "./contact.scss";
import { Header, Footer, IntroHome2, ContactUs } from "../../components";
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
    $(".contact .contact__title").css(
      "background-position",
      "center " + parseInt(-x / 2.8) + "px"
    );
  };
  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }
  componentDidMount() {
    this.handleScroll();
    window.addEventListener("scroll", this.handleScroll);

    $(".contact__brands__slick-autoplay").slick({
      dots: false,
      arrows: false,
      slidesToShow: 5,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
      responsive: [
        {
          breakpoint: 1300,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
            infinite: true,
            dots: false
          }
        },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        }
        // You can unslick at a given breakpoint now by adding:
        // settings: "unslick"
        // instead of a settings object
      ]
    });
    $(".contact__brands__slick-autoplay").on("beforeChange", function(
      event,
      slick,
      currentSlide,
      nextSlide
    ) {
      $(".contact__brands__slick-autoplay .slick-dots li").removeClass(
        "slick-active"
      );
      $(".contact__brands__slick-autoplay .slick-dots li button")
        .attr("aria-pressed", "false")
        .focus(function() {
          this.blur();
        });
    });

    var heightOfFooter = $(".contact__footer .footer-wrapper").height();
    $(".contact__contactUs").css("margin-bottom", heightOfFooter + "px");
  }
  render() {
    return (
      <div className="contact">
        <Head>
          <title>Liên hệ</title>
          <meta name="title" content="Liên hệ" />
          <meta
            name="description"
            content="Liên hệ công ty công nghệ Pegasus"
          />
        </Head>
        <React.Fragment>
          <div className="contact__header">
            <Header {...this.props} />
          </div>
          <div className="contact__title">
            <div className="contact__title__image">
              <img src="https://dalia.elated-themes.com/wp-content/uploads/2018/06/about-us-title-img.jpg"></img>
              <div className="contact__title__image__info">
                <div>about us</div>
                <p>
                  Lorem ipsum dolor sit amet, animal utamur id nec, clita doming
                  oblique usu cu, utroque omittam summ.
                </p>
              </div>
            </div>
            <div className="contact__title__inner">
              <div>about us</div>
              <p>
                Lorem ipsum dolor sit amet, animal utamur id nec, clita doming
                oblique usu cu, utroque omittam summ.
              </p>
            </div>
          </div>
          <div className="contact__intro">
            {this.state.intro.map(intro => {
              return <IntroHome2 introHome2={intro}></IntroHome2>;
            })}
          </div>
          <div className="contact__brands">
            <div className="contact__brands__slick-autoplay">
              <div className="contact__brands__slick-autoplay__item">
                <img src="https://dalia.elated-themes.com/wp-content/uploads/2018/05/client-6.png"></img>
              </div>
              <div className="contact__brands__slick-autoplay__item">
                <img src="https://dalia.elated-themes.com/wp-content/uploads/2018/05/client-7.png"></img>
              </div>
              <div className="contact__brands__slick-autoplay__item">
                <img src="https://dalia.elated-themes.com/wp-content/uploads/2018/05/client-8.png"></img>
              </div>
              <div className="contact__brands__slick-autoplay__item">
                <img src="https://dalia.elated-themes.com/wp-content/uploads/2018/05/client-5.png"></img>
              </div>
              <div className="contact__brands__slick-autoplay__item">
                <img src="https://dalia.elated-themes.com/wp-content/uploads/2018/05/client-2.png"></img>
              </div>
              <div className="contact__brands__slick-autoplay__item">
                <img src="https://dalia.elated-themes.com/wp-content/uploads/2018/05/client-3.png"></img>
              </div>
            </div>
          </div>
          <div className="contact__contactUs">
            <ContactUs />
          </div>
          {/* <div>
            <GoogleMapReact
              bootstrapURLKeys={{
                key: "AIzaSyARRlQaEH15TgxFmDliRLH-NpQNAEqcJps"
              }}
              defaultCenter={this.state.center}
              defaultZoom={this.state.zoom}
            />
          </div> */}
          <div className="contact__footer">
            <Footer />
          </div>
        </React.Fragment>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps)(Contact);

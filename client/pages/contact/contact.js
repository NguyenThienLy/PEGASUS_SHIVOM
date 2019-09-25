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
            "https://i.imgur.com/SdqiWdP.png",
          title: "Sức khỏe",
          content:
            "Sức khỏe không phải là thứ chúng ta có thể mua. Tuy nhiên, nó có thể là một tài khoản tiết kiệm cực kỳ giá trị"
        },
        {
          image:
            "https://i.imgur.com/Rr4Nxja.png",
          title: "Cân bằng",
          content:
            "Khi ta tạo ra sự yên bình, hài hòa và cân bằng trong tâm hồn, ta sẽ tìm thấy chúng trong đời mình"
        },
        {
          image:
            "https://i.imgur.com/SYIHz0O.png  ",
          title: "Hạnh phúc",
          content:
            "Hạnh phúc lớn nhất ở đời là có thể tin chắc rằng ta được yêu thương - yêu vì chính bản thân ta, hay đúng hơn, yêu bất kể bản thân ta"
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
                  <div>Về chúng tôi</div>
                  <p>
                    Với giá trị cốt lõi vì sức khỏe cộng đồng Hiệp Hòa Yoga xem đó là kim chỉ nam để hoạt động
                  </p>
                </div>
              </div>
              <div className="contact__body__title__inner">
                <div>Về chúng tôi</div>
                <p>
                  Với giá trị cốt lõi vì sức khỏe cộng đồng Hiệp Hòa Yoga xem đó là kim chỉ nam để hoạt động
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
                  <img src="https://i.imgur.com/2ovXBXJ.png "></img>
                </div>
                <div className="contact__body__brands__slick-autoplay__item">
                  <img src="https://i.imgur.com/u6U1336.png"></img>
                </div>
                <div className="contact__body__brands__slick-autoplay__item">
                  <img src="https://i.imgur.com/nuLIaqY.png"></img>
                </div>
                <div className="contact__body__brands__slick-autoplay__item">
                  <img src="https://i.imgur.com/WEBPRF7.png"></img>
                </div>
                <div className="contact__body__brands__slick-autoplay__item">
                  <img src="https://i.imgur.com/XsPbeWD.png"></img>
                </div>
                <div className="contact__body__brands__slick-autoplay__item">
                  <img src="https://i.imgur.com/aL7go5w.png"></img>
                </div>
                <div className="contact__body__brands__slick-autoplay__item">
                  <img src="https://i.imgur.com/ESlmROr.png"></img>
                </div>
                <div className="contact__body__brands__slick-autoplay__item">
                  <img src="https://i.imgur.com/RnuUiEx.png"></img>
                </div>
                <div className="contact__body__brands__slick-autoplay__item">
                  <img src="https://i.imgur.com/CE6MmSF.png"></img>
                </div>
                <div className="contact__body__brands__slick-autoplay__item">
                  <img src="https://i.imgur.com/zEnx4mj.png"></img>
                </div>
                <div className="contact__body__brands__slick-autoplay__item">
                  <img src="https://i.imgur.com/PWYN1WN.png"></img>
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

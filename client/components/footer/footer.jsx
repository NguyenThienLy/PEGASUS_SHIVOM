import * as React from "react";
import ReactDOM from "react-dom";
import "./footer.scss";
import Link from "next/link";
import Head from "next/head";
import { HoverDivAnimation } from "../hoverDivAnimation/hoverDivAnimation";
import { SocialGroup } from "./socialGroup/socialGroup";
export class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [
        {
          name: "trang chủ",
          linkHref: "/home/home",
          linkAs: "/"
        },
        {
          name: "khoá học",
          linkHref: "/allCourses/allCourses",
          linkAs: "/khoa-hoc"
        },
        {
          name: "tin tức",
          linkHref: "/home/home",
          linkAs: "/"
        },
        {
          name: "về chúng tôi",
          linkHref: "/contact/contact",
          linkAs: "/lien-he"
        }
      ]
    };
  }
  componentDidMount() {
    $(window).on("resize", function() {
      let body = $(".footer-wrapper").prev();

      if ($(window).outerWidth() > 599) {
        let heightOfFooter = $(".footer-wrapper").outerHeight();
        $(".footer-wrapper").css({
          position: "fixed",
          zIndex: "-1"
        });
        body.css("margin-bottom", heightOfFooter + "px");
      } else {
        $(".footer-wrapper").css({
          position: "static",
          zIndex: "0"
        });
        body.css("margin-bottom", "0px");
      }
    });
  }

  handleLoad = () => {
    // set margin-bottom for body
    let heightOfFooter = $(".footer-wrapper").height();
    let body = $(".footer-wrapper").prev();

    if ($(window).outerWidth() > 599) {
      $(".footer-wrapper").css({
        position: "fixed",
        zIndex: "-1"
      });
      body.css("margin-bottom", heightOfFooter + "px");
    } else {
      $(".footer-wrapper").css({
        position: "static",
        zIndex: "0"
      });
      body.css("margin-bottom", "0px");
    }
  };

  render() {
    return (
      <div className="footer-wrapper" onLoad={this.handleLoad}>
        <div className="footer-wrapper__first-floor">
          <div className="footer-wrapper__first-floor__logo">
            <a className="footer-wrapper__first-floor__logo__a">
              <img
                src={this.props.logo}
                className="footer-wrapper__first-floor__logo__a__img"
              />
            </a>
          </div>
          <div className="footer-wrapper__first-floor__contact">
            <a className="footer-wrapper__first-floor__contact__item" href="#">
              {this.props.address}
            </a>
            <a
              className="footer-wrapper__first-floor__contact__item"
              href={`mailto:${this.props.email}`}
            >
              Email: {this.props.email}
            </a>
            <a className="footer-wrapper__first-floor__contact__item" href="#">
              Điện thoại: {this.props.phone}
            </a>
          </div>
          <div className="footer-wrapper__first-floor__social-group">
            {this.props.social ? (
              <SocialGroup social={this.props.social} />
            ) : null}
          </div>
          <div className="footer-wrapper__first-floor__email-regis">
            <form className="footer-wrapper__first-floor__email-regis__form">
              <input
                type="email"
                className="footer-wrapper__first-floor__email-regis__form__input"
                placeholder="Đăng ký nhận mail"
              />
              <button
                type="button"
                className="footer-wrapper__first-floor__email-regis__form__btn footer-wrapper__first-floor__email-regis__form__btn--primary footer-wrapper__first-floor__email-regis__form__btn--inside"
              >
                gửi
              </button>
            </form>
          </div>
        </div>
        <hr className="footer-wrapper__divider" />
        <div className="footer-wrapper__second-floor">
          {this.state.categories.map((category, index) => {
            return (
              <Link href={category.linkHref} as={category.linkAs} key={index}>
                <a
                  href={category.linkAs}
                  className="footer-wrapper__second-floor__item"
                >
                  <HoverDivAnimation title={category.name} />
                </a>
              </Link>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Footer;

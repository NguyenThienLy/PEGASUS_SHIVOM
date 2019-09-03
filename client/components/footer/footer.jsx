import * as React from "react";
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
          href: "#"
        },
        {
          name: "khoá học",
          href: "#"
        },
        {
          name: "tin tức",
          href: "#"
        },
        {
          name: "về chúng tôi",
          href: "#"
        }
      ]
    };
  }

  componentDidMount() {
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

    $(window).on("resize", function() {
      if ($(window).outerWidth() > 599) {
        heightOfFooter = $(".footer-wrapper").height();
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

  render() {
    return (
      <div className="footer-wrapper">
        <div className="footer-wrapper__first-floor">
          <div className="footer-wrapper__first-floor__logo">
            <a className="footer-wrapper__first-floor__logo__a">
              <img
                src="https://i.etsystatic.com/13665876/d/il/d5b7d0/1363979907/il_340x270.1363979907_ic0j.jpg?version=0"
                className="footer-wrapper__first-floor__logo__a__img"
              />
            </a>
          </div>
          <div className="footer-wrapper__first-floor__contact">
            <a className="footer-wrapper__first-floor__contact__item" href="#">
              145/51/41 Le Duc Tho Go Vap
            </a>
            <a
              className="footer-wrapper__first-floor__contact__item"
              href="mailto:minhle140198@gmail.com"
            >
              Email: minhle140198@gmail
            </a>
            <a className="footer-wrapper__first-floor__contact__item" href="#">
              Phone: +(84)934952396
            </a>
          </div>
          <div className="footer-wrapper__first-floor__social-group">
            <SocialGroup />
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
          {this.state.categories.map(category => {
            return (
              <div
                href={category.href}
                className="footer-wrapper__second-floor__item"
              >
                <HoverDivAnimation title={category.name} />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Footer;

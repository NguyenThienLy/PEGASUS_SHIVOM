import * as React from "react";
import "./headerAdmin.scss";
import { HoverDivAnimation, Sidebar } from "../../components";

export class HeaderAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userList: [
        {
          name: "Trang cá nhân"
        },
        {
          name: "Cài đặt"
        },
        {
          name: "Đăng xuất"
        }
      ]
    };
  }

  componentDidMount() {
    var outHeightOfUser = $(".headerAdmin__wrapper__user").outerHeight();
    $(".headerAdmin__wrapper__user__inner").css({
      top: outHeightOfUser
    });

    $(".headerAdmin__wrapper__user").click(function(e) {
      e.stopPropagation(); // ko chạy body, html click
      var maxHeight = $(".headerAdmin__wrapper__user__inner").css("maxHeight");
      if (maxHeight == "500px") {
        $("body, html").css("cursor", "default");
        $(".headerAdmin__wrapper__user__inner").css({
          maxHeight: "0px",
          MozTransition: "max-height 100ms ease",
          MsTransition: "max-height 100ms ease",
          OTransition: "max-height 100ms ease",
          WebkitTransition: "max-height 100ms ease",
          transition: "max-height 100ms ease"
        });
      } else {
        $("body, html").css("cursor", "pointer");
        $(".headerAdmin__wrapper__user__inner").css({
          maxHeight: "500px",
          MozTransition: "max-height 300ms ease",
          MsTransition: "max-height 300ms ease",
          OTransition: "max-height 300ms ease",
          WebkitTransition: "max-height 300ms ease",
          transition: "max-height 300ms ease"
        });
      }
    });

    $(".headerAdmin__wrapper__user__inner").click(function(e) {
      e.stopPropagation();
    });

    $("body,html").click(function(e) {
      $("body, html").css("cursor", "default");
      $(".headerAdmin > .sidebar").removeClass("sidebar__show-menu");
      $(".background-overlay").css("display", "none");

      var maxHeight = $(".headerAdmin__wrapper__user__inner").css("maxHeight");
      if (maxHeight == "500px") {
        $(".headerAdmin__wrapper__user__inner").css({
          maxHeight: "0px",
          MozTransition: "max-height 200ms ease",
          MsTransition: "max-height 200ms ease",
          OTransition: "max-height 200ms ease",
          WebkitTransition: "max-height 200ms ease",
          transition: "max-height 200ms ease"
        });
      }
    });

    $(".headerAdmin__wrapper__icon-sidebar").click(function(e) {
      e.stopPropagation();
      $(".headerAdmin > .sidebar").addClass("sidebar__show-menu");
      $(".background-overlay").css("display", "block");
      $("body, html").css("cursor", "pointer");

      var maxHeight = $(".headerAdmin__wrapper__user__inner").css("maxHeight");
      if (maxHeight == "500px") {
        $(".headerAdmin__wrapper__user__inner").css({
          maxHeight: "0px",
          MozTransition: "max-height 200ms ease",
          MsTransition: "max-height 200ms ease",
          OTransition: "max-height 200ms ease",
          WebkitTransition: "max-height 200ms ease",
          transition: "max-height 200ms ease"
        });
      }
    });

    $(".headerAdmin > .sidebar").click(function(e) {
      e.stopPropagation();
    });

    $(window).on("resize", function() {
      var win = $(this);
      if (win.outerWidth() > 991) {
        if ($(".sidebar").hasClass("sidebar__show-menu")) {
          $(".sidebar").removeClass("sidebar__show-menu");
          $(".background-overlay").css("display", "none");
        }
      }
    });
  }

  render() {
    const { headerAdmin, sidebar, logo } = this.props;
    return (
      <div className="headerAdmin">
        <Sidebar sidebar={sidebar} logo={logo}></Sidebar>
        <div className="headerAdmin__wrapper">
          <div className="headerAdmin__wrapper__icon-sidebar">
            <i class="fas fa-bars"></i>
          </div>
          <div className="headerAdmin__wrapper__user">
            <img
              className="headerAdmin__wrapper__user__avatar"
              src={headerAdmin.avatar}
              alt=""
            />
            <div className="headerAdmin__wrapper__user__name">
              <span>
                {headerAdmin.name}
                <i class="fas fa-angle-down"></i>
              </span>
            </div>
            <div className="headerAdmin__wrapper__user__inner">
              <ul className="headerAdmin__wrapper__user__inner__list-items">
                {this.state.userList.map((item, index) => {
                  return (
                    <li
                      key={index}
                      className="headerAdmin__wrapper__user__inner__list-items__item"
                    >
                      <HoverDivAnimation title={item.name} />
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

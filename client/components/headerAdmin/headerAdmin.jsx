import * as React from "react";
import "./headerAdmin.scss";
import { HoverDivAnimation } from "../hoverDivAnimation/hoverDivAnimation";

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
    // $(".header__wrapper__page-menu-area__left__navbar__list-items__item").hover(
    //   function() {
    //     var navBarWrapper = $(this)
    //       .children()
    //       .eq(1);
    //     if (navBarWrapper.height()) {
    //       navBarWrapper.height(0 + "px");
    //     } else {
    //       let navBarHeight = navBarWrapper
    //         .children()
    //         .eq(0)
    //         .outerHeight();
    //       console.log(navBarHeight);
    //       navBarWrapper.height(navBarHeight + "px");
    //     }
    //   }
    // );

    var outHeightOfUser = $(".headerAdmin__user").outerHeight();
    $(".headerAdmin__user__inner").css({
      top: outHeightOfUser
    });

    $(".headerAdmin__user").click(function(e) {
      e.stopPropagation(); // ko chạy body, html click
      var maxHeight = $(".headerAdmin__user__inner").css("maxHeight");
      if (maxHeight == "500px") {
        $("body, html").css("cursor", "default");
        $(".headerAdmin__user__inner").css({
          maxHeight: "0px",
          MozTransition: "max-height 100ms ease",
          MsTransition: "max-height 100ms ease",
          OTransition: "max-height 100ms ease",
          WebkitTransition: "max-height 100ms ease",
          transition: "max-height 100ms ease"
        });
      } else {
        $("body, html").css("cursor", "pointer");
        $(".headerAdmin__user__inner").css({
          maxHeight: "500px",
          MozTransition: "max-height 300ms ease",
          MsTransition: "max-height 300ms ease",
          OTransition: "max-height 300ms ease",
          WebkitTransition: "max-height 300ms ease",
          transition: "max-height 300ms ease"
        });
      }
    });

    $(".headerAdmin__user__inner").click(function(e) {
      e.stopPropagation();
    });

    $("body,html").click(function(e) {
      $("body, html").css("cursor", "default");
      var maxHeight = $(".headerAdmin__user__inner").css("maxHeight");
      if (maxHeight == "500px") {
        $(".headerAdmin__user__inner").css({
          maxHeight: "0px",
          MozTransition: "max-height 200ms ease",
          MsTransition: "max-height 200ms ease",
          OTransition: "max-height 200ms ease",
          WebkitTransition: "max-height 200ms ease",
          transition: "max-height 200ms ease"
        });
      }
    });
  }

  render() {
    const { headerAdmin } = this.props;
    return (
      <div className="headerAdmin">
        <div className="headerAdmin__user">
          <img
            className="headerAdmin__user__avatar"
            src={headerAdmin.avatar}
            alt=""
          />
          <div className="headerAdmin__user__name">
            <span>
              {headerAdmin.name}
              <i class="fas fa-angle-down"></i>
            </span>
          </div>
          <div className="headerAdmin__user__inner">
            <ul className="headerAdmin__user__inner__list-items">
              {this.state.userList.map((item, index) => {
                return (
                  <li
                    key={index}
                    className="headerAdmin__user__inner__list-items__item"
                  >
                    <HoverDivAnimation title={item.name} />
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

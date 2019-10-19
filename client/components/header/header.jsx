import * as React from "react";
import "./header.scss";
import Link from "next/link";
import { HoverDivAnimation } from "../hoverDivAnimation/hoverDivAnimation";
import { Sidebar } from "../sidebar/sidebar";
import * as _ from "lodash";
import { CloudImage } from "../../components";
// import Router from 'next/router'
// import Head from 'next/head'
// import * as _ from "lodash"

// import { action } from '../../actions'
// import { api } from '../../services'

export class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [
        {
          name: "trang chủ",
          linkHref: "/home/home",
          linkAs: "/",
          key: "home"
        },
        {
          name: "khoá học",
          key: "course",
          linkHref: "/allCourses/allCourses",
          linkAs: "/khoa-hoc",
          subCategories: []
        },
        {
          name: "tin tức",
          key: "news",
          subCategories: [

          ]
        },
        {
          name: "về chúng tôi",
          linkHref: "/contact/contact",
          linkAs: "/lien-he",
          key: "about"
        }
      ]
    };
  }
  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }
  componentDidUpdate(prevProps) {
    if (
      prevProps.courses.items.length === 0 &&
      this.props.courses.items.length > 0
    ) {
      const courseCategoryIndex = this.state.categories.findIndex(item => {
        return item.key === "course";
      });
      const subCategories = this.props.courses.items.map(item => {
        return {
          name: item.name,
          linkHref: `/course/course?slug=${item.slug}`,
          linkAs: `/khoa-hoc/${item.slug}`
        };
      });
      this.state.categories[courseCategoryIndex].subCategories = subCategories;
      this.setState({ categories: this.state.categories });
    }
    if (
      prevProps.newCategories.items.length === 0 &&
      this.props.newCategories.items.length > 0
    ) {
      const newCategoryIndex = this.state.categories.findIndex(item => {
        return item.key === "news";
      });
      const subCategories = this.props.newCategories.items.map(item => {
        return {
          name: item.name,
          linkHref: `/blog/blog?categorySlug=${item.slug}`,
          linkAs: `/${item.slug}`
        };
      });
      this.state.categories[newCategoryIndex].subCategories = subCategories;
      this.setState({ categories: this.state.categories });
    }
  }
  // async componentWillMount() {
  // }
  // async componentDidMount() {
  //     const s = document.createElement('script');
  //     s.type = 'text/javascript';
  //     s.async = true;
  //     s.innerHTML = `
  //         var prevScrollpos = window.pageYOffset;
  //         window.onscroll = function() {
  //         var currentScrollPos = window.pageYOffset;
  //         if (prevScrollpos > currentScrollPos) {
  //             document.getElementById("header-id").style.top = "0px";
  //             //document.getElementById("header-id").style.position = "fixed";
  //             document.getElementById("header-id").style.boxShadow = "none";
  //         } else {
  //             document.getElementById("header-id").style.top = "-67px";
  //             document.getElementById("header-id").style.boxShadow = "rgba(0, 0, 0, 0.16) 0px 0px 3px 0px, rgba(0, 0, 0, 0.12) 0px 1px 7px 0px";
  //         }
  //         prevScrollpos = currentScrollPos;
  //         }
  //     `;
  //     document.body.appendChild(s);
  // }

  componentDidMount() {
    if (this.props.courses.items.length > 0) {
      const courseCategoryIndex = this.state.categories.findIndex(item => {
        return item.key === "course";
      });
      const subCategories = this.props.courses.items.map(item => {
        return {
          name: item.name,
          linkHref: `/course/course?slug=${item.slug}`,
          linkAs: `/khoa-hoc/${item.slug}`
        };
      });
      this.state.categories[courseCategoryIndex].subCategories = subCategories;
      this.setState({ categories: this.state.categories });
    }
    if (this.props.newCategories.items.length > 0) {
      const newCategoryIndex = this.state.categories.findIndex(item => {
        return item.key === "news";
      });
      const subCategories = this.props.newCategories.items.map(item => {
        return {
          name: item.name,
          linkHref: `/blog/blog?categorySlug=${item.slug}`,
          linkAs: `/${item.slug}`
        };
      });
      this.state.categories[newCategoryIndex].subCategories = subCategories;
      this.setState({ categories: this.state.categories });
    }
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

    var outerHeightOfHeader = $(
      ".header__wrapper__page-menu-area__left__navbar__list-items__item"
    ).outerHeight();
    $(
      ".header__wrapper__page-menu-area__left__navbar__list-items__item__sub-navbar-wrapper"
    ).css({
      top: outerHeightOfHeader + "px"
    });

    var outerHeightOfSubHeader = $(
      ".header__sub-wrapper__page-menu-area__left__navbar__list-items__item"
    ).outerHeight();
    $(
      ".header__sub-wrapper__page-menu-area__left__navbar__list-items__item__sub-navbar-wrapper"
    ).css({
      top: outerHeightOfSubHeader + "px"
    });

    var prevScrollPos = window.pageYOffset;
    var currentScrollPos = window.pageYOffset;
    var posToExpose = 300;
    if (prevScrollPos < posToExpose) {
      $(".header .header__sub-wrapper").css({
        maxHeight: "0px",
        MozTransition: "max-height 1000ms ease",
        MsTransition: "max-height 1000ms ease",
        OTransition: "max-height 1000ms ease",
        WebkitTransition: "max-height 1000ms ease",
        transition: "max-height 1000ms ease",
        animation: "0ms delay-overflow-hidden",
        animationFillMode: "forwards"
      });
    } else if (prevScrollPos >= posToExpose) {
      $(".header .header__sub-wrapper").css({
        maxHeight: "500px"
      });
    }

    window.onscroll = function () {
      currentScrollPos = window.pageYOffset;
      if (prevScrollPos > currentScrollPos && currentScrollPos < posToExpose) {
        $(".header .header__sub-wrapper").css({
          maxHeight: "0px",
          MozTransition: "max-height 1000ms ease",
          MsTransition: "max-height 1000ms ease",
          OTransition: "max-height 1000ms ease",
          WebkitTransition: "max-height 1000ms ease",
          transition: "max-height 1000ms ease",
          animation: "100ms delay-overflow-hidden",
          animationFillMode: "forwards"
        });
      } else if (
        prevScrollPos <= currentScrollPos &&
        currentScrollPos >= posToExpose &&
        !$(".header > .sidebar").hasClass("sidebar__show-menu")
      ) {
        $(".header .header__sub-wrapper").css({
          maxHeight: "500px",
          MozTransition: "max-height 1500ms ease 200ms",
          MsTransition: "max-height 1500ms ease 200ms",
          OTransition: "max-height 1500ms ease 200ms",
          WebkitTransition: "max-height 1500ms ease 200ms",
          transition: "max-height 1500ms ease 200ms",
          animation: "2000ms delay-overflow-visible",
          animationFillMode: "forwards"
        });
      }
      prevScrollPos = currentScrollPos;
    };

    $(".header__wrapper__page-menu-area__left__sidebar").click(function (e) {
      e.stopPropagation();
      $(".header > .sidebar").addClass("sidebar__show-menu");
      $(".background-overlay").css("display", "block");
      $("body, html").css("cursor", "pointer");
    });

    $(".header__sub-wrapper__page-menu-area__left__sidebar").click(function (e) {
      e.stopPropagation();
      $(".header > .sidebar").addClass("sidebar__show-menu");
      $(".background-overlay").css("display", "block");
      $("body, html").css("cursor", "pointer");
      $(".header .header__sub-wrapper").css({
        maxHeight: "0px",
        MozTransition: "max-height 300ms ease",
        MsTransition: "max-height 300ms ease",
        OTransition: "max-height 300ms ease",
        WebkitTransition: "max-height 300ms ease",
        transition: "max-height 300ms ease",
        animation: "100ms delay-overflow-hidden",
        animationFillMode: "forwards"
      });
    });

    $(".header > .sidebar").click(function (e) {
      e.stopPropagation();
    });

    $("body,html").click(function (e) {
      $("body, html").css("cursor", "default");
      $(".header > .sidebar").removeClass("sidebar__show-menu");
      if (
        prevScrollPos <= currentScrollPos &&
        currentScrollPos >= posToExpose
      ) {
        $(".header .header__sub-wrapper").css({
          maxHeight: "500px",
          MozTransition: "max-height 1500ms ease 200ms",
          MsTransition: "max-height 1500ms ease 200ms",
          OTransition: "max-height 1500ms ease 200ms",
          WebkitTransition: "max-height 1500ms ease 200ms",
          transition: "max-height 1500ms ease 200ms",
          animation: "2000ms delay-overflow-visible",
          animationFillMode: "forwards"
        });
      }
      $(".background-overlay").css("display", "none");
    });

    $(window).on("resize", function () {
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
    return (
      <div className="header">
        <Sidebar
          sidebar={this.state.categories}
          logo={this.props.setting.logo}
        ></Sidebar>
        <div className="header__wrapper">
          <div className="header__wrapper__page-menu-area">
            <div className="header__wrapper__page-menu-area__left">
              <div className="header__wrapper__page-menu-area__left__sidebar">
                <i className="fas fa-bars"></i>
              </div>
              <div className="header__wrapper__page-menu-area__left__logo-wrapper">
                <a
                  href="#"
                  className="header__wrapper__page-menu-area__left__logo-wrapper__a"
                >
                  <img
                    src={this.props.setting.logo}
                    className="header__wrapper__page-menu-area__left__logo-wrapper__a__img"
                  />
                </a>
              </div>
              <div>
                <div className="header__wrapper__page-menu-area__left__navbar">
                  <ul className="header__wrapper__page-menu-area__left__navbar__list-items">
                    {this.state.categories.map((category, index) => {
                      return category.subCategories ? (
                        <li
                          key={index}
                          className="header__wrapper__page-menu-area__left__navbar__list-items__item"
                        >
                          <Link
                            href={category.linkHref}
                            as={category.linkAs}
                            key={index}
                          >
                            <a
                              href={category.linkAs}
                              className="header__wrapper__page-menu-area__left__navbar__list-items__item__hover-div"
                            >
                              <HoverDivAnimation title={category.name} />
                            </a>
                          </Link>

                          <div className="header__wrapper__page-menu-area__left__navbar__list-items__item__sub-navbar-wrapper">
                            <ul className="header__wrapper__page-menu-area__left__navbar__list-items__item__sub-navbar-wrapper__sub-navbar">
                              {category.subCategories.map(
                                (subCategory, index) => {
                                  return (
                                    <Link
                                      href={subCategory.linkHref}
                                      as={subCategory.linkAs}
                                      key={index}
                                    >
                                      <li
                                        key={index}
                                        className="header__wrapper__page-menu-area__left__navbar__list-items__item__sub-navbar-wrapper__sub-navbar__item"
                                      >
                                        <HoverDivAnimation
                                          title={subCategory.name}
                                        />
                                      </li>
                                    </Link>
                                  );
                                }
                              )}
                            </ul>
                          </div>
                        </li>
                      ) : (
                          <Link
                            href={category.linkHref}
                            as={category.linkAs}
                            key={index}
                          >
                            <li className="header__wrapper__page-menu-area__left__navbar__list-items__item">
                              <HoverDivAnimation title={category.name} />
                            </li>
                          </Link>
                        );
                    })}
                  </ul>
                </div>
              </div>
            </div>
            <div className="header__wrapper__page-menu-area__right">
              <div className="header__wrapper__page-menu-area__right__more-btn">
                {/* <i className="far fa-circle" />
                <i className="far fa-circle" />
                <i className="far fa-circle" /> */}
              </div>
            </div>
          </div>
        </div>
        <div className="header__sub-wrapper">
          <div className="header__sub-wrapper__page-menu-area">
            <div className="header__sub-wrapper__page-menu-area__left">
              <div className="header__sub-wrapper__page-menu-area__left__sidebar">
                <i className="fas fa-bars"></i>
              </div>
              <div className="header__sub-wrapper__page-menu-area__left__logo-wrapper">
                <a
                  href="#"
                  className="header__sub-wrapper__page-menu-area__left__logo-wrapper__a"
                >
                  <img
                    src={this.props.setting.logo}
                    className="header__sub-wrapper__page-menu-area__left__logo-wrapper__a__img"
                  />
                </a>
              </div>
              <div>
                <div className="header__sub-wrapper__page-menu-area__left__navbar">
                  <ul className="header__sub-wrapper__page-menu-area__left__navbar__list-items">
                    {this.state.categories.map((category, index) => {
                      return category.subCategories ? (
                        <li
                          key={index}
                          className="header__sub-wrapper__page-menu-area__left__navbar__list-items__item"
                        >
                          <HoverDivAnimation title={category.name} />
                          <div className="header__sub-wrapper__page-menu-area__left__navbar__list-items__item__sub-navbar-wrapper">
                            <ul className="header__sub-wrapper__page-menu-area__left__navbar__list-items__item__sub-navbar-wrapper__sub-navbar">
                              {category.subCategories.map(
                                (subCategory, index) => {
                                  return (
                                    <Link
                                      href={subCategory.linkHref}
                                      as={subCategory.linkAs}
                                      key={index}
                                    >
                                      <li
                                        key={index}
                                        className="header__sub-wrapper__page-menu-area__left__navbar__list-items__item__sub-navbar-wrapper__sub-navbar__item"
                                      >
                                        <HoverDivAnimation
                                          title={subCategory.name}
                                        />
                                      </li>
                                    </Link>
                                  );
                                }
                              )}
                            </ul>
                          </div>
                        </li>
                      ) : (
                          <Link
                            href={category.linkHref}
                            as={category.linkAs}
                            key={index}
                          >
                            <li className="header__sub-wrapper__page-menu-area__left__navbar__list-items__item">
                              <HoverDivAnimation title={category.name} />
                            </li>
                          </Link>
                        );
                    })}
                  </ul>
                </div>
              </div>
            </div>
            <div className="header__sub-wrapper__page-menu-area__right">
              <div className="header__sub-wrapper__page-menu-area__right__more-btn">
                {/* <i className="far fa-circle" />
                <i className="far fa-circle" />
                <i className="far fa-circle" /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;

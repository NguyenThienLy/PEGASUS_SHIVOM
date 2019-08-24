import * as React from "react";
import "./header.scss";
import Link from "next/link";
import { HoverDivAnimation } from "../hoverDivAnimation/hoverDivAnimation";
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
          name: "trang chủ"
        },
        {
          name: "khoá học",
          subCategories: [
            {
              name: "khoá học môt"
            },
            {
              name: "khoá học hai"
            },
            {
              name: "khoá học ba"
            }
          ]
        },
        {
          name: "tin tức",
          subCategories: [
            {
              name: "khoá học môt"
            },
            {
              name: "khoá học hai"
            },
            {
              name: "khoá học ba"
            }
          ]
        },
        {
          name: "về chúng tôi"
        }
      ]
    };
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
    // $(".header-wrapper__page-menu-area__left__navbar__list-items__item").hover(
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
  }

  render() {
    return (
      <div className="header-wrapper">
        <div className="header-wrapper__page-menu-area">
          <div className="header-wrapper__page-menu-area__left">
            <div className="header-wrapper__page-menu-area__left__logo-wrapper">
              <a
                href="#"
                className="header-wrapper__page-menu-area__left__logo-wrapper__a"
              >
                <img
                  src="https://i.etsystatic.com/13665876/d/il/d5b7d0/1363979907/il_340x270.1363979907_ic0j.jpg?version=0"
                  className="header-wrapper__page-menu-area__left__logo-wrapper__a__img"
                />
              </a>
            </div>
            <div>
              <div className="header-wrapper__page-menu-area__left__navbar">
                <ul className="header-wrapper__page-menu-area__left__navbar__list-items">
                  {this.state.categories.map(category => {
                    return category.subCategories ? (
                      <li className="header-wrapper__page-menu-area__left__navbar__list-items__item">
                        <HoverDivAnimation title={category.name} />
                        <div className="header-wrapper__page-menu-area__left__navbar__list-items__item__sub-navbar-wrapper">
                          <ul className="header-wrapper__page-menu-area__left__navbar__list-items__item__sub-navbar-wrapper__sub-navbar">
                            {category.subCategories.map(subCategory => {
                              return (
                                <li className="header-wrapper__page-menu-area__left__navbar__list-items__item__sub-navbar-wrapper__sub-navbar__item">
                                  <HoverDivAnimation title={subCategory.name} />
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      </li>
                    ) : (
                      <li className="header-wrapper__page-menu-area__left__navbar__list-items__item">
                        <HoverDivAnimation title={category.name} />
                      </li>
                    );
                  })}
                  ;
                </ul>
              </div>
            </div>
          </div>
          <div className="header-wrapper__page-menu-area__right">
            <div className="header-wrapper__page-menu-area__right__more-btn">
              <i class="far fa-circle" />
              <i class="far fa-circle" />
              <i class="far fa-circle" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;

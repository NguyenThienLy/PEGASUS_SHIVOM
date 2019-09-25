import * as React from "react";
import "./adminSidebar.scss";
import Link from 'next/link'

export class AdminSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [
        {
          name: "Tổng quan",
          linkAs: "/quan-ly/tong-quan",
          linkHref: "/manager/dashboard/dashboard"
        },
        {
          name: "Khoá học",
          linkAs: "/quan-ly/khoa-hoc/them",
          linkHref: "/manager/addCourse/addCourse"
        },
        {
          name: "Lớp học",
          linkAs: "/quan-ly/them-lop-hoc",
          linkHref: "/manager/addClass/addClass"
        },
        {
          name: "Quản lý lớp học",
          linkAs: "/quan-ly/lop-hoc",
          linkHref: "/manager/class/class"
        },
        {
          name: "Học viên",
          linkAs: "/quan-ly/hoc-vien",
          linkHref: "/manager/member/member"
        },
        {
          name: "Chuyên mục tin tức",
          linkAs: "/quan-ly/muc-tin-tuc",
          linkHref: "/manager/newsCategory/newsCategory"
        },
        {
          name: "Tin tức",
          linkAs: "/quan-ly/tin-tuc/them",
          linkHref: "/manager/addPost/addPost"
        },
        {
          name: "Thiết lập",
          linkAs: "/quan-ly/thiet-lap",
          linkHref: "/manager/setting/setting"
        },
      ]
    }
  }

  componentDidMount() {
    $(".admin-sidebar__inner__main-menu__sub-menu").click(function (e) {
      e.preventDefault(); // prevent the link from url
      var dropdownContent = this.nextElementSibling;
      var isOpened = false;

      if (dropdownContent.style.display === "block") {
        dropdownContent.style.display = "none";
      } else {
        isOpened = true;
        dropdownContent.style.display = "block";
      }

      $(
        ".admin-sidebar__inner__main-menu__sub-menu, .admin-sidebar__inner__main-menu__none-sub-menu"
      ).removeClass("admin-sidebar__inner__main-menu--item-active");
      $(".admin-sidebar__inner__main-menu__sub-menu__dropdown-container").css(
        "display",
        "none"
      );
      $(".admin-sidebar__inner__main-menu__sub-menu__dropdown-icon").removeClass(
        "admin-sidebar__inner__main-menu__sub-menu__dropdown-icon--transform-down"
      );
      $(".admin-sidebar__inner__main-menu__sub-menu__dropdown-icon").addClass(
        "admin-sidebar__inner__main-menu__sub-menu__dropdown-icon--transform-left"
      );

      if (isOpened) {
        dropdownContent.style.display = "block";
      }

      $(this).toggleClass("admin-sidebar__inner__main-menu--item-active");

      var dropdownIcon = $(this).find(
        ".admin-sidebar__inner__main-menu__sub-menu__dropdown-icon"
      );
      if (dropdownContent.style.display === "block") {
        dropdownIcon.removeClass(
          "admin-sidebar__inner__main-menu__sub-menu__dropdown-icon--transform-left"
        );
        dropdownIcon.addClass(
          "admin-sidebar__inner__main-menu__sub-menu__dropdown-icon--transform-down"
        );
      } else {
        dropdownIcon.removeClass(
          "admin-sidebar__inner__main-menu__sub-menu__dropdown-icon--transform-down"
        );
        dropdownIcon.addClass(
          "admin-sidebar__inner__main-menu__sub-menu__dropdown-icon--transform-left"
        );
      }
    });

    $(".admin-sidebar__inner__main-menu__none-sub-menu").click(function () {
      $(
        ".admin-sidebar__inner__main-menu__sub-menu, .admin-sidebar__inner__main-menu__none-sub-menu"
      ).removeClass("admin-sidebar__inner__main-menu--item-active");
      $(".admin-sidebar__inner__main-menu__sub-menu__dropdown-container").css(
        "display",
        "none"
      );
      $(".admin-sidebar__inner__main-menu__sub-menu__dropdown-icon").removeClass(
        "admin-sidebar__inner__main-menu__sub-menu__dropdown-icon--transform-down"
      );
      $(".admin-sidebar__inner__main-menu__sub-menu__dropdown-icon").addClass(
        "admin-sidebar__inner__main-menu__sub-menu__dropdown-icon--transform-left"
      );

      $(this).toggleClass("admin-sidebar__inner__main-menu--item-active");
    });
  }

  render() {
    return (
      <div className="sidebar">
        <div className="admin-sidebar__inner">
          <div className="admin-sidebar__inner__top-menu">
            <div className="admin-sidebar__inner__top-menu__logo">
              <Link href="/home/home" as="/">
                <a href="/">
                  <img src={this.props.logo} alt="" />
                </a>
              </Link>
            </div>
            <div className="admin-sidebar__inner__top-menu__title">
              Hiệp Hoà Yoga
            </div>
          </div>
          <ul className="admin-sidebar__inner__main-menu">
            {this.state.categories.map((item, index) => {
              return item.subCategories ? (
                <React.Fragment key={index}>
                  <li className="admin-sidebar__inner__main-menu__sub-menu">
                    <a href="#">
                      {/* <span
                        dangerouslySetInnerHTML={{ __html: item.icon }}
                      ></span> */}
                      {item.name}
                    </a>
                    <div className="admin-sidebar__inner__main-menu__sub-menu__dropdown-icon">
                      <i className="fas fa-caret-left" />
                    </div>
                  </li>
                  <div className="admin-sidebar__inner__main-menu__sub-menu__dropdown-container">
                    <ul>
                      {item.subCategories.map((subItem, index) => {
                        return (
                          <Link href={subItem.linkHref} as={subItem.linkAs} key={index}>
                            <li>

                              <a href={subItem.linkAs}>{subItem.name}</a>

                            </li>
                          </Link>
                        );
                      })}
                    </ul>
                  </div>
                </React.Fragment>
              ) : (
                  <Link href={item.linkHref} as={item.linkAs} key={index}>
                    <li className="admin-sidebar__inner__main-menu__none-sub-menu">

                      <a href={item.linkAs}>
                        {/* <span
                        dangerouslySetInnerHTML={{ __html: item.icon }}
                      ></span> */}
                        {item.name}
                      </a>

                    </li>
                  </Link>
                );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

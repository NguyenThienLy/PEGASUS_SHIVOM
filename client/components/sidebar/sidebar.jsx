import * as React from "react";
import "./sidebar.scss";

export class Sidebar extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    $(".sidebar__inner__main-menu__sub-menu").click(function(e) {
      e.preventDefault();

      $(".sidebar__inner__main-menu__sub-menu").removeClass(
        "sidebar__inner__main-menu--item-active"
      );
      $(".sidebar__inner__main-menu__sub-menu__dropdown-container").css(
        "display",
        "none"
      );
      $(".sidebar__inner__main-menu__sub-menu__dropdown-icon").removeClass(
        "sidebar__inner__main-menu__sub-menu__dropdown-icon--transform-down"
      );
      $(".sidebar__inner__main-menu__sub-menu__dropdown-icon").addClass(
        "sidebar__inner__main-menu__sub-menu__dropdown-icon--transform-left"
      );

      $(this).toggleClass("sidebar__inner__main-menu--item-active");

      var dropdownContent = this.nextElementSibling;

      if (dropdownContent.style.display === "block") {
        dropdownContent.style.display = "none";
      } else {
        dropdownContent.style.display = "block";
      }

      var dropdownIcon = $(this).find(
        ".sidebar__inner__main-menu__sub-menu__dropdown-icon"
      );
      if (dropdownContent.style.display === "block") {
        dropdownIcon.removeClass(
          "sidebar__inner__main-menu__sub-menu__dropdown-icon--transform-left"
        );
        dropdownIcon.addClass(
          "sidebar__inner__main-menu__sub-menu__dropdown-icon--transform-down"
        );
      } else {
        dropdownIcon.removeClass(
          "sidebar__inner__main-menu__sub-menu__dropdown-icon--transform-down"
        );
        dropdownIcon.addClass(
          "sidebar__inner__main-menu__sub-menu__dropdown-icon--transform-left"
        );
      }
    });
  }

  render() {
    return (
      <div className="sidebar">
        <div className="sidebar__inner">
          <div className="sidebar__inner__top-menu">
            <div className="sidebar__inner__top-menu__logo">
              <a href="#">
                <img
                  src="https://i.etsystatic.com/13665876/d/il/d5b7d0/1363979907/il_340x270.1363979907_ic0j.jpg?version=0"
                  alt=""
                />
              </a>
            </div>
            <div className="sidebar__inner__top-menu__title">
              shivom dashboard
            </div>
          </div>
          <ul className="sidebar__inner__main-menu">
            <li>
              <a href="#">
                <i class="fas fa-user" />
                Trang chủ
              </a>
            </li>
            <li className="sidebar__inner__main-menu__sub-menu">
              <a href="#">
                <i class="far fa-list-alt"></i>Khóa học
              </a>
              <div className="sidebar__inner__main-menu__sub-menu__dropdown-icon">
                <i class="fas fa-caret-left" />
              </div>
            </li>
            <div className="sidebar__inner__main-menu__sub-menu__dropdown-container">
              <ul>
                <li>
                  <a href="#">Khóa học 1{/* <span>5</span> */}</a>
                </li>
                <li>
                  <a href="#">Khóa học 2{/* <span>3</span> */}</a>
                </li>
                <li>
                  <a href="#">Khóa học 3{/* <span>3</span> */}</a>
                </li>
              </ul>
            </div>
            <li className="sidebar__inner__main-menu__sub-menu">
              <a href="#">
                <i class="far fa-newspaper"></i>Tin tức
              </a>
              <div className="sidebar__inner__main-menu__sub-menu__dropdown-icon">
                <i class="fas fa-caret-left" />
              </div>
            </li>
            <div className="sidebar__inner__main-menu__sub-menu__dropdown-container">
              <ul>
                <li>
                  <a href="#">Tin tức 1{/* <span>5</span> */}</a>
                </li>
                <li>
                  <a href="#">Tin tức 2{/* <span>3</span> */}</a>
                </li>
                <li>
                  <a href="#">Tin tức 3{/* <span>3</span> */}</a>
                </li>
              </ul>
            </div>
            <li>
              <a href="#">
                <i class="fas fa-info"></i>Về chúng tôi
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

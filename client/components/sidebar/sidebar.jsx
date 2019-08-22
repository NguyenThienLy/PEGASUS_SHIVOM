import * as React from "react";
import "./sidebar.scss";

export class Sidebar extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    $(".sidebar__inner__main-menu__sub-menu").click(function(e) {
      e.preventDefault();
      $(".sidebar__inner__main-menu__sub-menu").toggleClass(
        "sidebar__inner__main-menu--item-active"
      );

      var dropdownContent = this.nextElementSibling;
      if (dropdownContent.style.display === "block") {
        dropdownContent.style.display = "none";
      } else {
        dropdownContent.style.display = "block";
      }

      if (dropdownContent.style.display === "block") {
        $(".sidebar__inner__main-menu__sub-menu__dropdown-icon").removeClass(
          "sidebar__inner__main-menu__sub-menu__dropdown-icon--transform-left"
        );
        $(".sidebar__inner__main-menu__sub-menu__dropdown-icon").addClass(
          "sidebar__inner__main-menu__sub-menu__dropdown-icon--transform-down"
        );
      } else {
        $(".sidebar__inner__main-menu__sub-menu__dropdown-icon").removeClass(
          "sidebar__inner__main-menu__sub-menu__dropdown-icon--transform-down"
        );
        $(".sidebar__inner__main-menu__sub-menu__dropdown-icon").addClass(
          "sidebar__inner__main-menu__sub-menu__dropdown-icon--transform-left"
        );
      }
    });
  }

  render() {
    return (
      <div className="sidebar">
        <div className="sidebar__inner sidebar__style-scrollbar">
          <div className="sidebar__inner__top-menu">
            <div className="sidebar__inner__top-menu__logo">
              <img
                src="https://i.etsystatic.com/13665876/d/il/d5b7d0/1363979907/il_340x270.1363979907_ic0j.jpg?version=0"
                alt=""
              />
            </div>
            <div className="sidebar__inner__top-menu__title">
              shivom dashboard
            </div>
          </div>
          <ul className="sidebar__inner__main-menu">
            <li>
              <a href="#">
                <i class="fas fa-user" />
                Giới thiệu
              </a>
            </li>
            <li className="sidebar__inner__main-menu__sub-menu">
              <a href="#">Sản phẩm</a>
              <div className="sidebar__inner__main-menu__sub-menu__dropdown-icon">
                <i class="fas fa-caret-left" />
              </div>
            </li>
            <div className="sidebar__inner__main-menu__sub-menu__dropdown-container">
              <ul>
                <li>
                  <a href="#">
                    Combo
                    <span>5</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    Tất cả
                    <span>3</span>
                  </a>
                </li>
              </ul>
            </div>
            <li>
              <a href="#">Tin tức</a>
            </li>
            <li>
              <a href="#">Tags</a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

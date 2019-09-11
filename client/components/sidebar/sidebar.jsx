import * as React from "react";
import "./sidebar.scss";

export class Sidebar extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    $(".sidebar__inner__main-menu__sub-menu").click(function(e) {
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
        ".sidebar__inner__main-menu__sub-menu, .sidebar__inner__main-menu__none-sub-menu"
      ).removeClass("sidebar__inner__main-menu--item-active");
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

      if (isOpened) {
        dropdownContent.style.display = "block";
      }

      $(this).toggleClass("sidebar__inner__main-menu--item-active");

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

    $(".sidebar__inner__main-menu__none-sub-menu").click(function() {
      $(
        ".sidebar__inner__main-menu__sub-menu, .sidebar__inner__main-menu__none-sub-menu"
      ).removeClass("sidebar__inner__main-menu--item-active");
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
    });
  }

  render() {
    const { sidebar } = this.props;

    return (
      <div className="sidebar">
        <div className="sidebar__inner">
          <div className="sidebar__inner__top-menu">
            <div className="sidebar__inner__top-menu__logo">
              <a href={sidebar.homeLink}>
                <img src={sidebar.logoSource} alt="" />
              </a>
            </div>
            <div className="sidebar__inner__top-menu__title">
              {sidebar.title}
            </div>
          </div>
          <ul className="sidebar__inner__main-menu">
            {sidebar.listItems.map(item => {
              return item.subItems ? (
                <React.Fragment>
                  <li className="sidebar__inner__main-menu__sub-menu">
                    <a href={item.link}>
                      <span
                        dangerouslySetInnerHTML={{ __html: item.icon }}
                      ></span>
                      {item.name}
                    </a>
                    <div className="sidebar__inner__main-menu__sub-menu__dropdown-icon">
                      <i class="fas fa-caret-left" />
                    </div>
                  </li>
                  <div className="sidebar__inner__main-menu__sub-menu__dropdown-container">
                    <ul>
                      {item.subItems.map(subItem => {
                        return (
                          <li>
                            <a href={subItem.link}>{subItem.name}</a>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </React.Fragment>
              ) : (
                <li className="sidebar__inner__main-menu__none-sub-menu">
                  <a href={item.link}>
                    <span
                      dangerouslySetInnerHTML={{ __html: item.icon }}
                    ></span>
                    {item.name}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

webpackHotUpdate("static/development/pages/index.js",{

/***/ "./components/header/header.jsx":
/*!**************************************!*\
  !*** ./components/header/header.jsx ***!
  \**************************************/
/*! exports provided: Header, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Header", function() { return Header; });
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/classCallCheck */ "../node_modules/@babel/runtime-corejs2/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/createClass */ "../node_modules/@babel/runtime-corejs2/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/possibleConstructorReturn */ "../node_modules/@babel/runtime-corejs2/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/getPrototypeOf */ "../node_modules/@babel/runtime-corejs2/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/inherits */ "../node_modules/@babel/runtime-corejs2/helpers/esm/inherits.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ "../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _header_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./header.scss */ "./components/header/header.scss");
/* harmony import */ var _header_scss__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_header_scss__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! next/link */ "../node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_7__);







 // import Router from 'next/router'
// import Head from 'next/head'
// import * as _ from "lodash"
// import { action } from '../../actions'
// import { api } from '../../services'

var Header =
/*#__PURE__*/
function (_React$Component) {
  Object(_babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__["default"])(Header, _React$Component);

  function Header(props) {
    var _this;

    Object(_babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, Header);

    _this = Object(_babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__["default"])(this, Object(_babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__["default"])(Header).call(this, props));
    _this.state = {};
    return _this;
  } // async componentWillMount() {
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
  // onSearch = async () => {
  //     const query = this.refs.search.value
  //     this.setState({ search: query })
  // }
  // onSearchKeyPress = async (event) => {
  //     console.log("search xong rồi")
  //     // Router.push(`/searchResult/searchResult?search=${this.state.search}`, `/tim-kiem?search=${this.state.search}`)
  // }


  Object(_babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(Header, [{
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("div", {
        className: "header-wrapper"
      }, react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("div", {
        className: "header-wrapper__page-menu-area"
      }, react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("div", {
        className: "header-wrapper__page-menu-area__left"
      }, react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("div", {
        className: "header-wrapper__page-menu-area__left__logo-wrapper"
      }, react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("a", {
        className: "header-wrapper__page-menu-area__left__logo-wrapper__img"
      }, react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("img", {
        src: "https://dalia.elated-themes.com/wp-content/uploads/2018/06/dalia-logo-img-1.png"
      }))), react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("nav", {
        className: "header-wrapper__page-menu-area__left__navbar"
      }, react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("ul", {
        className: "header-wrapper__page-menu-area__left__navbar__list-items"
      }, react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("li", {
        className: "header-wrapper__page-menu-area__left__navbar__list-items__item",
        id: "nav-home-page"
      }, react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("a", {
        href: "#",
        className: "category-name"
      }, react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("span", null, "Trang ch\u1EE7"))), react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("li", {
        className: "header-wrapper__page-menu-area__left__navbar__list-items__item",
        id: "nav-courses"
      }, react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("a", {
        href: "#",
        className: "category-name"
      }, react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("span", null, "Kho\xE1 h\u1ECDc")), react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("div", {
        className: "header-wrapper__page-menu-area__left__navbar__list-items__item__dropdown"
      }, react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("div", {
        className: "header-wrapper__page-menu-area__left__navbar__list-items__item__dropdown__inner"
      }, react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("ul", {
        className: "header-wrapper__page-menu-area__left__navbar__list-items__item__dropdown__inner__list-items"
      }, react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("li", {
        className: "header-wrapper__page-menu-area__left__navbar__list-items__item__dropdown__inner__list-items__item"
      }, react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("a", {
        href: "#"
      }, react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("span", null, "kho\xE1 h\u1ECDc m\u1ED9t"))), react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("li", {
        className: "header-wrapper__page-menu-area__left__navbar__list-items__item__dropdown__inner__list-items__item"
      }, react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("a", {
        href: "#"
      }, react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("span", null, "kho\xE1 h\u1ECDc hai"))), react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("li", {
        className: "header-wrapper__page-menu-area__left__navbar__list-items__item__dropdown__inner__list-items__item"
      }, react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("a", {
        href: "#"
      }, react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("span", null, "kho\xE1 h\u1ECDc ba"))))))), react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("li", {
        className: "header-wrapper__page-menu-area__left__navbar__list-items__item",
        id: "nav-news"
      }, react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("a", {
        href: "#",
        className: "category-name"
      }, react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("span", null, "Tin t\u1EE9c"))), react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("li", {
        className: "header-wrapper__page-menu-area__left__navbar__list-items__item",
        id: "nav-about-us"
      }, react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("a", {
        href: "#",
        className: "category-name"
      }, react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("span", null, "V\u1EC1 ch\xFAng t\xF4i")))))), react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("div", {
        className: "header-wrapper__page-menu-area__right"
      }, "hehehe")));
    }
  }]);

  return Header;
}(react__WEBPACK_IMPORTED_MODULE_5__["Component"]);
/* harmony default export */ __webpack_exports__["default"] = (Header);

/***/ })

})
//# sourceMappingURL=index.js.c546c6a9df342f3652aa.hot-update.js.map
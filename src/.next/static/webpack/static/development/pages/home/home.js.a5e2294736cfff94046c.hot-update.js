webpackHotUpdate("static/development/pages/home/home.js",{

/***/ "./components/header/header.jsx":
/*!**************************************!*\
  !*** ./components/header/header.jsx ***!
  \**************************************/
/*! exports provided: Header */
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
/* harmony import */ var _assets_bootstrap4_bootstrap_min_scss__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./../../assets/bootstrap4/bootstrap.min.scss */ "./assets/bootstrap4/bootstrap.min.scss");
/* harmony import */ var _assets_bootstrap4_bootstrap_min_scss__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_assets_bootstrap4_bootstrap_min_scss__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _header_scss__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./header.scss */ "./components/header/header.scss");
/* harmony import */ var _header_scss__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_header_scss__WEBPACK_IMPORTED_MODULE_7__);








var Header =
/*#__PURE__*/
function (_React$Component) {
  Object(_babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__["default"])(Header, _React$Component);

  function Header(props) {
    Object(_babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, Header);

    return Object(_babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__["default"])(this, Object(_babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__["default"])(Header).call(this, props));
  }

  Object(_babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(Header, [{
    key: "render",
    value: function render() {
      console.log("props của header: ", this.props);
      return react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("div", {
        className: "headerWrap"
      }, react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("nav", {
        className: "navbar navbar-expand-lg navbar-light navbar-default navbar-fixed-top"
      }, react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("a", {
        className: "name navbar-brand"
      }, "Book Review"), react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("button", {
        className: "navbar-toggler fix-top",
        type: "button",
        "data-toggle": "collapse",
        "data-target": "#navbarSupportedContent",
        "aria-controls": "navbarSupportedContent",
        "aria-expanded": "false",
        "aria-label": "Toggle navigation"
      }, react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("span", {
        className: "navbar-toggler-icon"
      })), react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("div", {
        className: "navWrap collapse navbar-collapse",
        id: "navbarSupportedContent"
      }, react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("ul", {
        className: "navbar-nav mr-auto mainMenu"
      }, react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("li", {
        className: "nav-item current"
      }, react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("a", {
        href: "#",
        className: "nav-link active"
      }, "Trang ch\u1EE7")), react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("li", {
        className: "nav-item"
      }, react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("a", {
        href: "#",
        className: "nav-link"
      }, "B\xE0i vi\u1EBFt")), react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("li", {
        className: "nav-item"
      }, react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("a", {
        href: "#",
        className: "nav-link"
      }, "Th\u1EC3 lo\u1EA1i")), react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("li", {
        className: "nav-item"
      }, react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("a", {
        href: "#",
        className: "nav-link"
      }, "T\xE1c gi\u1EA3")), react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("li", {
        className: "nav-item"
      }, react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("a", {
        href: "#",
        className: "nav-link"
      }, "Reviewer")), react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("li", {
        className: "nav-item"
      }, react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("a", {
        href: "#",
        className: "nav-link"
      }, "Li\xEAn h\u1EC7")), react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("li", {
        className: "nav-item dropdown"
      }, react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("a", {
        href: "#",
        className: "nav-link dropdown-toggle",
        "data-toggle": "dropdown",
        role: "button",
        "ria-haspopup": "true",
        "aria-expanded": "false"
      }, "Xem th\xEAm"), react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("div", {
        className: "dropdown-menu"
      }, react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("a", {
        href: "#",
        className: "dropdown-item"
      }, "N\u1ED5i b\u1EADt"), react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("a", {
        href: "#",
        className: "dropdown-item"
      }, "B\u1EA3ng x\u1EBFp h\u1EA1ng")))), react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("div", {
        className: "accountWrap justify-content-end"
      }, react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("ul", {
        className: "navbar-nav"
      }, react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("li", {
        className: "nav-item dropdown"
      }, react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("a", {
        href: "#",
        className: "nav-link dropdown-toggle",
        role: "button",
        "data-toggle": "dropdown",
        "aria-expanded": "false",
        "aria-haspopup": "true"
      }, "Vi"), react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("div", {
        className: "dropdown-menu"
      }, react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("a", {
        href: "#",
        className: "dropdown-item"
      }, "Ti\u1EBFng Anh"))), react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("li", {
        className: "nav-item"
      }, react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("a", {
        href: "#",
        className: "nav-link"
      }, "\u0110\u0103ng nh\u1EADp")), react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("li", {
        className: "nav-item"
      }, react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("a", {
        href: "#",
        className: "nav-link"
      }, "\u0110\u0103ng k\xFD")))))));
    }
  }]);

  return Header;
}(react__WEBPACK_IMPORTED_MODULE_5__["Component"]);

/***/ })

})
//# sourceMappingURL=home.js.a5e2294736cfff94046c.hot-update.js.map
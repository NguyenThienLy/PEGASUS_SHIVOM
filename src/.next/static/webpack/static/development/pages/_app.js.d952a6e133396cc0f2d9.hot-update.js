webpackHotUpdate("static/development/pages/_app.js",{

/***/ "./reducers/book.js":
/*!**************************!*\
  !*** ./reducers/book.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var initBookState = [{
  _id: "1",
  name: "Init book"
}];
var bookAction = {
  fetch: "FETCH_BOOK",
  add: "ADD_BOOK",
  delete: "DELETE_BOOK",
  edit: "EDIT_BOOK"
};

var books = function books() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initBookState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case bookAction.fetch:
      state = action.payload;
      break;

    case bookAction.add:
      state.unshift(action.payload);
      break;

    case bookAction.delete:
      break;

    case bookAction.edit:
      break;
  }

  return state;
};

/* harmony default export */ __webpack_exports__["default"] = (books);

/***/ })

})
//# sourceMappingURL=_app.js.d952a6e133396cc0f2d9.hot-update.js.map
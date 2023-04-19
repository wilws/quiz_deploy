"use strict";
exports.id = 573;
exports.ids = [573];
exports.modules = {

/***/ 8573:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Xk": () => (/* binding */ getQuizzes),
/* harmony export */   "f_": () => (/* binding */ postQuiz),
/* harmony export */   "s6": () => (/* binding */ getQuiz)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9648);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([axios__WEBPACK_IMPORTED_MODULE_0__]);
axios__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];

// GET /api/quiz   or
// GET /api/quiz?cursor=:id
async function getQuizzes(PageParam = null) {
    const endPoint = PageParam ? `api/quiz?cursor=${PageParam}` : "api/quiz";
    const { data  } = await axios__WEBPACK_IMPORTED_MODULE_0__["default"].get(endPoint);
    return data;
}
// GET /api/quiz/:id
async function getQuiz(quizId) {
    const endPoint = `/api/quiz/${quizId}`;
    const { data  } = await axios__WEBPACK_IMPORTED_MODULE_0__["default"].get(endPoint);
    return data.user;
}
// POST /api/quiz
async function postQuiz(body) {
    const endPoint = "api/quiz";
    const res = await axios__WEBPACK_IMPORTED_MODULE_0__["default"].post(endPoint, body);
    return res.status;
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;
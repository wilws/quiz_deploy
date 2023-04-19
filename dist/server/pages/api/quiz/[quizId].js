"use strict";
(() => {
var exports = {};
exports.id = 841;
exports.ids = [841];
exports.modules = {

/***/ 3524:
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ 5835:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "_": () => (/* binding */ prisma)
/* harmony export */ });
/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3524);
/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);

const globalForPrisma = global;
const prisma = globalForPrisma.prisma ?? new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();
if (false) {}


/***/ }),

/***/ 8196:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ handler)
});

;// CONCATENATED MODULE: ./src/utils/helper.tsx
const isPositiveInteger = (stringNum)=>{
    const number = Number(stringNum);
    const isInteger = Number.isInteger(number);
    const isPositive = number > 0;
    return isInteger && isPositive;
};
const paramIdSanitiser = (id)=>{
    return isPositiveInteger(id) ? Number(id) : -1;
};
const gradientColorGenerator = (id)=>{
    const colormMatch = [
        [
            "#C6FFDD",
            "#F27121"
        ],
        [
            "#DAD299",
            "#B0DAB9"
        ],
        [
            "#ffdde1",
            "#ee9ca7"
        ],
        [
            "#E0EAFC",
            "#CFDEF3"
        ],
        [
            "#a8ff78",
            "#78ffd6"
        ],
        [
            "#c2e59c",
            "#64b3f4"
        ],
        [
            "#fffbd5",
            "#DD2476"
        ],
        [
            "#FFEEEE",
            "#DDEFBB"
        ],
        [
            "#ffd194",
            "#70e1f5"
        ],
        [
            "#ECE9E6",
            "#6dd5ed"
        ],
        [
            "#E6DADA",
            "#274046"
        ]
    ];
    return colormMatch[id % 10];
};

// EXTERNAL MODULE: ./src/db/connection.ts
var connection = __webpack_require__(5835);
;// CONCATENATED MODULE: ./src/pages/api/quiz/[quizId].ts


async function handler(req, res) {
    const { quizId  } = req.query;
    if (paramIdSanitiser(quizId) == -1) {
        res.status(400).json({
            message: "Bad request"
        });
    }
    // GET /api/quiz/:quizId
    if (req.method == "GET") {
        try {
            const user = await connection/* prisma.user.findUnique */._.user.findUnique({
                where: {
                    id: paramIdSanitiser(quizId)
                },
                include: {
                    question: true
                }
            });
            res.status(200).json({
                user
            });
        } catch (err) {
            res.status(500).json({
                message: "Failed to fetch User data"
            });
        }
    }
    // ---- Reserved for Extesnion ---- //
    // DELETE /api/quiz/:quizId
    if (req.method == "DELETE") {
        res.status(404).json({
            message: "Not found"
        });
    }
    // PUT /api/quiz/:quizId
    if (req.method == "PUT") {
        res.status(404).json({
            message: "Not found"
        });
    }
    // PATCH /api/quiz/:quizId
    if (req.method == "PATCH") {
        res.status(404).json({
            message: "Not found"
        });
    }
// ---------------------------------- //
}


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(8196));
module.exports = __webpack_exports__;

})();
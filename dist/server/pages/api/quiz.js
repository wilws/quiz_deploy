"use strict";
(() => {
var exports = {};
exports.id = 562;
exports.ids = [562];
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

/***/ 9823:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ quizApiHandler)
});

// EXTERNAL MODULE: external "@prisma/client"
var client_ = __webpack_require__(3524);
;// CONCATENATED MODULE: ./src/utils/db-func.tsx

const getFirstUserId = async ()=>{
    const prisma = new client_.PrismaClient();
    try {
        const firstUserObj = await prisma.user.findFirst();
        if (!firstUserObj) throw new Error("cannot Set cursor");
        return firstUserObj.id;
    } catch (err) {
        return false;
    } finally{
        await prisma.$disconnect();
    }
};
const getLastUserId = async ()=>{
    const prisma = new client_.PrismaClient();
    try {
        const lastUserObj = await prisma.user.findMany({
            orderBy: {
                id: "desc"
            },
            take: 1
        });
        if (!lastUserObj) throw new Error("cannot Set cursor");
        return lastUserObj[0].id;
    } catch (err) {
        return false;
    } finally{
        await prisma.$disconnect();
    }
};

// EXTERNAL MODULE: ./src/db/connection.ts
var connection = __webpack_require__(5835);
;// CONCATENATED MODULE: ./src/pages/api/quiz/index.ts


async function quizApiHandler(req, res) {
    // GET /api/quiz
    if (req.method == "GET") {
        const { cursor  } = req.query;
        let lastUserId = await getLastUserId();
        if (typeof lastUserId !== "number") {
            res.status(500).json({
                message: "Failed to fetch User data"
            });
            return;
        }
        let _cursor = lastUserId;
        let _take = 13; // amend this no to change the no of fetch
        let _skip = 0;
        const cursorIdFromClient = Number(cursor);
        if (cursorIdFromClient && cursorIdFromClient < lastUserId) {
            _cursor = cursorIdFromClient;
            _skip = 1;
        }
        try {
            const users = await connection/* prisma.user.findMany */._.user.findMany({
                take: _take,
                skip: _skip,
                cursor: {
                    id: _cursor
                },
                include: {
                    question: true
                },
                orderBy: {
                    id: "desc"
                }
            });
            const result = {
                users,
                count: users.length
            };
            if (users.length > 0) {
                const lastItemId = users[users.length - 1].id;
                if (lastItemId !== await getFirstUserId()) {
                    result.cursor = lastItemId.toString();
                }
            }
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json({
                message: "Failed to fetch User data"
            });
        }
    } // End of //GET /api/quiz
    // POST /api/quiz
    if (req.method == "POST") {
        const { creatorName , questions  } = req.body;
        try {
            const users1 = await connection/* prisma.user.create */._.user.create({
                data: {
                    name: creatorName
                }
            });
            for(let i = 0; i < questions.length; i++){
                const question = questions[i].question;
                const answer = questions[i].answer;
                await connection/* prisma.question.create */._.question.create({
                    data: {
                        question,
                        answer,
                        creatorId: users1.id
                    }
                });
            }
            res.status(204).end();
        } catch (err1) {
            res.status(500).json({
                message: "Failed to create quiz"
            });
        }
    } // End of //POST /api/quiz
}


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(9823));
module.exports = __webpack_exports__;

})();
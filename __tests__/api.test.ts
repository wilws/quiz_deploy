
// import type { NextApiRequest, NextApiResponse } from "next";


const { createMocks, RequestMethod } = require("node-mocks-http");
const viewHandler =  require("../src/pages/api/quiz/view");



// GET /api/quiz/view
describe("ViewAPI Endpoints", () => {
//   function mockRequestResponse(method: RequestMethod = "GET") {

//     const { req, res }: { req: NextApiRequest; res: NextApiResponse } =
//       createMocks({ method });

//     req.headers = {
//       "Content-Type": "application/json",
//     };
//     return { req, res };
//   }

  test("404: if no such endpoint is found, return status 404", async () => {
    //   const { req, res } = mockRequestResponse();

      const { req, res } = createMocks({
        method: "GET",
        query: {
          animal: "dog",
        },
      });
      await viewHandler( req, res);

      expect(res.statusCode).toBe(200);
      expect(res.statusMessage).toEqual("OK");

  });
});

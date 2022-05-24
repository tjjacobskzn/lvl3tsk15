// we will use supertest to test HTTP requests/responses
const request = require("supertest");
// we also need our app for the correct routes!
const app = require("../app.js");

// this tests the "fetch" method to see if it actually gets something.
test("Testing fetch", async () => {
  const response = await request(app).post("/api/login").send({
    username: "tj",
    password: "suck",
  });
  expect(response.body).not.toBeNull();
  expect(response.statusCode).toBe(200);
});

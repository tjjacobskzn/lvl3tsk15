import axios from "axios"

// this tests the "fetch" method to see if it actually gets something.
test("Testing fetch", async () => {
 const response = axios.get("/")
  expect(response.body).not.toBeNull();
});

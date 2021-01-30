import { makeProperties } from "../deck";

describe("Properties", () => {
  it("should create properties", () => {
    const properties = makeProperties();
    console.log(JSON.stringify(properties));
  });
});

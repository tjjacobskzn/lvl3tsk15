import React from "react";
import Landing from "../pages/Landing";
import renderer from "react-test-renderer";

describe("snapshot test", () => {
  test("snapshot for landing page", () => {
    // this tells us what this snapshot is for.
    const renderedComponent = renderer.create(<Landing />).toJSON();
    // we "expect" our rendered component to match our snapshot.
    // if it does not it fails, else it passes.
    expect(renderedComponent).toMatchSnapshot();
  });
});

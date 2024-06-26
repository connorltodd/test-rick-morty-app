import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import Home from "../app/page";

describe("Home Page", () => {
  it("renders homepage unchanged", () => {
    const { container } = render(<Home />);
    expect(container).toMatchSnapshot();
  });
});

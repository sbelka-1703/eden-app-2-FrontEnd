import { render } from "@testing-library/react";

import { Missing404Section } from "./";
jest.mock("next/router", () => require("next-router-mock"));

describe("Missing404Section", () => {
  it("renders without throwing", () => {
    const { container } = render(<Missing404Section />);

    expect(container).toBeInTheDocument();
  });
});

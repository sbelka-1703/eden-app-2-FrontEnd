import { render } from "../../../../utils/jest-apollo";
import { ApplyContainer } from "./";
jest.mock("next/router", () => require("next-router-mock"));

describe("ApplyContainer", () => {
  it("renders without throwing", () => {
    const { container } = render(<ApplyContainer />);

    expect(container).toBeInTheDocument();
  });
});

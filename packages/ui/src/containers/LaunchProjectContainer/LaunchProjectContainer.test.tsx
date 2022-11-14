import { render } from "../../../utils/jest-apollo";
import { LaunchProjectContainer } from ".";
jest.mock("next/router", () => require("next-router-mock"));

describe("LaunchProjectContainer", () => {
  it("renders without throwing", () => {
    const { container } = render(<LaunchProjectContainer />);

    expect(container).toBeInTheDocument();
  });
});

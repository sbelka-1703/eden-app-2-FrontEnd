import { render } from "../../../../utils/jest-apollo";
import { InviteContainer } from "./";
jest.mock("next/router", () => require("next-router-mock"));

describe("InviteContainer", () => {
  it("renders without throwing", () => {
    const { container } = render(<InviteContainer />);

    expect(container).toBeInTheDocument();
  });
});

import { render } from "../../../utils/jext-apollo";
import { InviteContainer } from "./";

describe("InviteContainer", () => {
  it("renders without throwing", () => {
    const { container } = render(<InviteContainer />);

    expect(container).toBeInTheDocument();
  });
});

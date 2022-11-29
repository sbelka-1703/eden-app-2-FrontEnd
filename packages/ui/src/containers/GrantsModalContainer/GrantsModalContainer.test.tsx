import { render } from "../../../utils/jest-apollo";
import { GrantsModalContainer } from ".";

describe("GrantsModalContainer", () => {
  it("renders without throwing", () => {
    const { container } = render(<GrantsModalContainer />);

    expect(container).toBeInTheDocument();
  });
});

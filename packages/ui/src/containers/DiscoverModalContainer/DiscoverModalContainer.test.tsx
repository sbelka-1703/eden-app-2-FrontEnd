import { render } from "../../../utils/jest-apollo";
import { DiscoverModalContainer } from ".";

describe("DiscoverModalContainer", () => {
  it("renders without throwing", () => {
    const { container } = render(<DiscoverModalContainer />);

    expect(container).toBeInTheDocument();
  });
});

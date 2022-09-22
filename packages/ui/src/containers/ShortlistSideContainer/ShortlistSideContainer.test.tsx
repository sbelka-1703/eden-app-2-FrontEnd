import { render } from "../../../utils/jest-apollo";
import { ShortlistSideContainer } from ".";

describe("ShortlistSideContainer", () => {
  it("renders without throwing", () => {
    const { container } = render(<ShortlistSideContainer />);

    expect(container).toBeInTheDocument();
  });
});

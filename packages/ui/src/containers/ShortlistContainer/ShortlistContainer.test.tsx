import { render } from "../../../utils/jest-apollo";
import { ShortlistContainer } from ".";

describe("ShortlistContainer", () => {
  it("renders without throwing", () => {
    const { container } = render(<ShortlistContainer />);

    expect(container).toBeInTheDocument();
  });
});

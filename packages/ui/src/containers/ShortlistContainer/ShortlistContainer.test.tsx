import { render } from "../../../utils/jest-apollo";
import { ShortlistContainer } from ".";

describe("ShortlistContainer", () => {
  it("renders without throwing", () => {
    const { container } = render(<ShortlistContainer matchingMembers={[]} />);

    expect(container).toBeInTheDocument();
  });
});

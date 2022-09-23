import { render } from "../../../utils/jest-apollo";
import { ShortlistMemberContainer } from ".";

describe("ShortlistMemberContainer", () => {
  it("renders without throwing", () => {
    const { container } = render(<ShortlistMemberContainer />);

    expect(container).toBeInTheDocument();
  });
});

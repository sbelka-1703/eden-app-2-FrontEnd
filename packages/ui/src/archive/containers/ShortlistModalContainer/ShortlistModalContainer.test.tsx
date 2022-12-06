import { render } from "../../../../utils/jest-apollo";
import { ShortlistModalContainer } from ".";

describe("ShortlistModalContainer", () => {
  it("renders without throwing", () => {
    const { container } = render(<ShortlistModalContainer />);

    expect(container).toBeInTheDocument();
  });
});

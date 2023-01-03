import { render } from "../../../../utils/jest-apollo";
import { ShortlistModalContainerTest } from ".";

describe("ShortlistModalContainerTest", () => {
  it("renders without throwing", () => {
    const { container } = render(<ShortlistModalContainerTest />);

    expect(container).toBeInTheDocument();
  });
});

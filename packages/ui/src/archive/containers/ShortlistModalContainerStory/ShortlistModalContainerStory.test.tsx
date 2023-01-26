import { render } from "../../../../utils/jest-apollo";
import { ShortlistModalContainerStory } from ".";

describe("ShortlistModalContainerStory", () => {
  it("renders without throwing", () => {
    const { container } = render(<ShortlistModalContainerStory />);

    expect(container).toBeInTheDocument();
  });
});

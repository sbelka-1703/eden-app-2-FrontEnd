import { render } from "../../../../utils/jest-apollo";
import { ShortlistModalContainerStoryFilter } from ".";

describe("ShortlistModalContainerStoryFilter", () => {
  it("renders without throwing", () => {
    const { container } = render(<ShortlistModalContainerStoryFilter />);

    expect(container).toBeInTheDocument();
  });
});

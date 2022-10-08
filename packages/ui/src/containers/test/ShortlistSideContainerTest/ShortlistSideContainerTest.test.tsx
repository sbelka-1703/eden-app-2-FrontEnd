import { render } from "../../../../utils/jest-apollo";
import { ShortlistSideContainerTest } from ".";

describe("ShortlistSideContainerTest", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <ShortlistSideContainerTest matchingMembers={[]} />
    );

    expect(container).toBeInTheDocument();
  });
});

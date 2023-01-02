import { render } from "../../../../utils/jest-apollo";
import { ShortlistMemberContainer } from ".";

describe("ShortlistMemberContainer", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <ShortlistMemberContainer matchingMembers={[]} />
    );

    expect(container).toBeInTheDocument();
  });
});

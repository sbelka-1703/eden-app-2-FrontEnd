import { matchNodesToMembersMock } from "@eden/package-mock";
import { render } from "@testing-library/react";

import { UserDiscoverCard } from "./UserDiscoverCard";

describe("UserDiscoverCard", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <UserDiscoverCard matchMember={matchNodesToMembersMock()} />
    );

    expect(container).toBeInTheDocument();
  });
});

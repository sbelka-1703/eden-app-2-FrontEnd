import { MockedProvider } from "@apollo/client/testing";
import { matchNodesToMembersMock } from "@eden/package-mock";
import { render } from "@testing-library/react";

import { UserDiscoverCard } from "./UserDiscoverCard";

describe("UserDiscoverCard", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <MockedProvider>
        <UserDiscoverCard matchMember={matchNodesToMembersMock()} />
      </MockedProvider>
    );

    expect(container).toBeInTheDocument();
  });
});

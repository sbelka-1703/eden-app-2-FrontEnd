import { MockedProvider } from "@apollo/client/testing";
import { matchNodesToMembersMock } from "@eden/package-mock";
import { render } from "@testing-library/react";

import { UserDiscoverCardTest } from "./UserDiscoverCardTest";

describe("UserDiscoverCardTest", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <MockedProvider>
        <UserDiscoverCardTest matchMember={matchNodesToMembersMock()} />
      </MockedProvider>
    );

    expect(container).toBeInTheDocument();
  });
});

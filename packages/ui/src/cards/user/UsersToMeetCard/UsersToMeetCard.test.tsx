import { MockedProvider } from "@apollo/client/testing";
import { render } from "@testing-library/react";

import { UsersToMeetCard } from "./";

describe("UsersToMeetCard", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <MockedProvider>
        <UsersToMeetCard refetchMatchMembers={() => console.log("refetch")} />
      </MockedProvider>
    );

    expect(container).toBeInTheDocument();
  });
});

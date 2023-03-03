import { MockedProvider } from "@apollo/client/testing";
import { getMember } from "@eden/package-mock";
import { render } from "@testing-library/react";

import { MemberProjectGraph } from ".";

describe("SendMessageToUserModal", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <MockedProvider>
        <MemberProjectGraph
          memberId={getMember()._id!}
          projectID={"63ebca723f7197ebd2adbd21"}
        />
      </MockedProvider>
    );

    expect(container).toBeInTheDocument();
  });
});

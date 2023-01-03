import { MockedProvider } from "@apollo/client/testing";
import { getMember } from "@eden/package-mock";
import { render } from "@testing-library/react";

import { UserInviteModal } from "./UserInviteModal";

describe("UserInviteModal", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <MockedProvider>
        <UserInviteModal member={getMember()} />
      </MockedProvider>
    );

    expect(container).toBeInTheDocument();
  });
});

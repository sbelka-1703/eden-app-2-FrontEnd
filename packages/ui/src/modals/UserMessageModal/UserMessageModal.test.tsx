import { MockedProvider } from "@apollo/client/testing";
import { getMember } from "@eden/package-mock";
import { render } from "@testing-library/react";

import { UserMessageModal } from "./UserMessageModal";

describe("UserMessageModal", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <MockedProvider>
        <UserMessageModal member={getMember()} />
      </MockedProvider>
    );

    expect(container).toBeInTheDocument();
  });
});

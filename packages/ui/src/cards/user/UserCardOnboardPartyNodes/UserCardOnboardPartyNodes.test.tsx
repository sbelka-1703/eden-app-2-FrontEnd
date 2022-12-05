import { getMember } from "@eden/package-mock";

import { render } from "../../../../utils/jest-apollo";
import { UserCardOnboardPartyNodes } from ".";

describe("UserCardOnboardPartyNodes", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <UserCardOnboardPartyNodes member={getMember()} />
    );

    expect(container).toBeInTheDocument();
  });
});

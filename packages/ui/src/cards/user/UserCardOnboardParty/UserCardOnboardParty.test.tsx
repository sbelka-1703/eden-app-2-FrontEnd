import { getMember } from "@eden/package-mock";

import { render } from "../../../../utils/jest-apollo";
import { UserCardOnboardParty } from ".";

describe("UserCardOnboardParty", () => {
  it("renders without throwing", () => {
    const { container } = render(<UserCardOnboardParty member={getMember()} />);

    expect(container).toBeInTheDocument();
  });
});

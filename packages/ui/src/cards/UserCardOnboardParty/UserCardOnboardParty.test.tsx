import { render } from "../../../utils/jest-apollo";
import { UserCardOnboardParty } from ".";

describe("UserCardOnboardParty", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <UserCardOnboardParty
        member={{
          _id: undefined,
          bio: undefined,
          discordAvatar: undefined,
          discordName: undefined,
          skills: [],
        }}
      />
    );

    expect(container).toBeInTheDocument();
  });
});

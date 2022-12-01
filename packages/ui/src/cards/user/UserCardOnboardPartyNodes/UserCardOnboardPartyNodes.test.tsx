import { render } from "../../../../utils/jest-apollo";
import { UserCardOnboardPartyNodes } from ".";

describe("UserCardOnboardPartyNodes", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <UserCardOnboardPartyNodes
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

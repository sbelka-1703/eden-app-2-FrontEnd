import { render } from "../../../utils/jest-apollo";
import { UserProfileCard } from ".";

describe("UserProfileCard", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <UserProfileCard
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

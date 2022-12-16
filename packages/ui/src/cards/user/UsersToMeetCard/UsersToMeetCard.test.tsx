import { render } from "../../../../utils/jest-apollo";
import { UsersToMeetCard } from "./";

describe("UsersToMeetCard", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <UsersToMeetCard refetchMatchMembers={() => console.log("refetch")} />
    );

    expect(container).toBeInTheDocument();
  });
});

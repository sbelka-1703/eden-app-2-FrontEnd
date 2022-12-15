import { render } from "../../../../utils/jest-apollo";
import { UsersToMeetCard } from "./";

describe("UsersToMeetCard", () => {
  it("renders without throwing", () => {
    const { container } = render(<UsersToMeetCard />);

    expect(container).toBeInTheDocument();
  });
});

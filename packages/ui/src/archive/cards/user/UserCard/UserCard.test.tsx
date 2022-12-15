import { render } from "../../../../../utils/jest-apollo";
import { UserCard } from "./";

describe("UserCard", () => {
  it("renders without throwing", () => {
    const { container } = render(<UserCard />);

    expect(container).toBeInTheDocument();
  });
});

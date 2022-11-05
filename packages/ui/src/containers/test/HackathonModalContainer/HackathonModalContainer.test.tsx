import { render } from "../../../../utils/jest-apollo";
import { HackathonModalContainer } from ".";

describe("HackathonModalContainer", () => {
  it("renders without throwing", () => {
    const { container } = render(<HackathonModalContainer />);

    expect(container).toBeInTheDocument();
  });
});

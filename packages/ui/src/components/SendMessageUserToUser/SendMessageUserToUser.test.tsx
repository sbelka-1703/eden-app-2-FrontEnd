import { render } from "../../../utils/jest-apollo";
import { SendMessageUserToUser } from ".";

describe("SendMessageUserToUser", () => {
  it("renders without throwing", () => {
    const { container } = render(<SendMessageUserToUser member={{}} />);

    expect(container).toBeInTheDocument();
  });
});

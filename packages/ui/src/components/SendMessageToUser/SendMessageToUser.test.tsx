import { render } from "../../../utils/jest-apollo";
import { SendMessageToUser } from ".";

describe("SendMessageToUser", () => {
  it("renders without throwing", () => {
    const { container } = render(<SendMessageToUser member={{}} />);

    expect(container).toBeInTheDocument();
  });
});

import { render } from "../../../utils/jest-apollo";
import { SendMessageToUser } from ".";

describe("SendMessageToUserModal", () => {
  it("renders without throwing", () => {
    const { container } = render(<SendMessageToUser member={{}} />);

    expect(container).toBeInTheDocument();
  });
});

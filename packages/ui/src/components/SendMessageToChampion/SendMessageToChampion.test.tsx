import { render } from "../../../utils/jest-apollo";
import { SendMessageToChampion } from ".";

describe("SendMessageToUserModal", () => {
  it("renders without throwing", () => {
    const { container } = render(<SendMessageToChampion member={{}} />);

    expect(container).toBeInTheDocument();
  });
});

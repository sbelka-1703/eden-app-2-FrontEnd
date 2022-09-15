import { render } from "../../../utils/jest-apollo";
import { RoleModal } from ".";

describe("RoleModal", () => {
  it("renders without throwing", () => {
    const { container } = render(<RoleModal />);

    expect(container).toBeInTheDocument();
  });
});

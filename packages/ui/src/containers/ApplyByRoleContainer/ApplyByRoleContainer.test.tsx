import { render } from "../../../utils/jest-apollo";
import { ApplyByRoleContainer } from "./";

describe("ApplyByRoleContainer", () => {
  it("renders without throwing", () => {
    const { container } = render(<ApplyByRoleContainer />);

    expect(container).toBeInTheDocument();
  });
});

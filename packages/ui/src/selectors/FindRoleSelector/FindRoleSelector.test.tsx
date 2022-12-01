import { render } from "../../../utils/jest-apollo";
import { FindRoleSelector } from "./";

describe("FindRoleSelector", () => {
  it("renders without throwing", () => {
    const { container } = render(<FindRoleSelector />);

    expect(container).toBeInTheDocument();
  });
});

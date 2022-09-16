import { render } from "../../../utils/jest-apollo";
import { SignUpCard } from "./";

describe("SignUpCard", () => {
  it("renders without throwing", () => {
    const { container } = render(<SignUpCard roles={[]} />);

    expect(container).toBeInTheDocument();
  });
});

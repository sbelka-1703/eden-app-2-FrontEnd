import { render } from "../../../utils/jext-apollo";
import { ApplyContainer } from "./";

describe("ApplyContainer", () => {
  it("renders without throwing", () => {
    const { container } = render(<ApplyContainer />);

    expect(container).toBeInTheDocument();
  });
});

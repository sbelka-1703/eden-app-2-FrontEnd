import { render } from "../../../utils/jest-apollo";
import { ViewProjectContainer } from ".";

describe("ViewProjectContainer", () => {
  it("renders without throwing", () => {
    const { container } = render(<ViewProjectContainer />);

    expect(container).toBeInTheDocument();
  });
});

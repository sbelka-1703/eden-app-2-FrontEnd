import { render } from "../../../utils/jest-apollo";
import { CreateProjectContainer } from ".";

describe("CreateProjectContainer", () => {
  it("renders without throwing", () => {
    const { container } = render(<CreateProjectContainer />);

    expect(container).toBeInTheDocument();
  });
});

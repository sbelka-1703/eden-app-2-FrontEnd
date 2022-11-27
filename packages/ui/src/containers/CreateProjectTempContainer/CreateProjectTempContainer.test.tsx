import { render } from "../../../utils/jest-apollo";
import { CreateProjectTempContainer } from ".";

describe("CreateProjectTempContainer", () => {
  it("renders without throwing", () => {
    const { container } = render(<CreateProjectTempContainer />);

    expect(container).toBeInTheDocument();
  });
});

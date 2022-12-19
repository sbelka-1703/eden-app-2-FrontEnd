import { render } from "../../../utils/jest-apollo";
import { ProjectsModalContainer } from ".";

describe("ProjectsModalContainer", () => {
  it("renders without throwing", () => {
    const { container } = render(<ProjectsModalContainer />);

    expect(container).toBeInTheDocument();
  });
});

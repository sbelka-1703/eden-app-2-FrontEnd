import { render } from "../../../utils/jest-apollo";
import { ProjectsMatchesModal } from ".";

describe("ProjectsMatchesModal", () => {
  it("renders without throwing", () => {
    const { container } = render(<ProjectsMatchesModal />);

    expect(container).toBeInTheDocument();
  });
});

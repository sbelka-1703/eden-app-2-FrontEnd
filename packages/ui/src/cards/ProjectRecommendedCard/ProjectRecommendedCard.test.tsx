import { render } from "../../../utils/jext-apollo";
import { ProjectRecommendedCard } from ".";

describe("ProjectRecommendedCard", () => {
  it("renders without throwing", () => {
    const { container } = render(<ProjectRecommendedCard />);

    expect(container).toBeInTheDocument();
  });
});

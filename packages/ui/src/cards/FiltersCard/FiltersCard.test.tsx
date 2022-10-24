import { render } from "../../../utils/jest-apollo";
import { FiltersCard } from ".";

describe("FiltersCard", () => {
  it("renders without throwing", () => {
    const { container } = render(<FiltersCard skills={[]} defaultValue={{}} />);

    expect(container).toBeInTheDocument();
  });
});

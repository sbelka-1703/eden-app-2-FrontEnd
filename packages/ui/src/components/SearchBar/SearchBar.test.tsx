import { render } from "../../../utils/jext-apollo";
import { SearchBar } from ".";

describe("SearchBar", () => {
  it("renders without throwing", () => {
    const { container } = render(<SearchBar />);

    expect(container).toBeInTheDocument();
  });
});

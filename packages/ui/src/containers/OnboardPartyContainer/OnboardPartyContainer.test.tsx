import { render } from "../../../utils/jext-apollo";
import { OnboardPartyContainer } from ".";

describe("OnboardPartyContainer", () => {
  it("renders without throwing", () => {
    const { container } = render(<OnboardPartyContainer members={[]} />);

    expect(container).toBeInTheDocument();
  });
});

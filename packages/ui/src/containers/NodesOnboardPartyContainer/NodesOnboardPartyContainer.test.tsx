import { render } from "../../../utils/jest-apollo";
import { NodesOnboardPartyContainer } from "./";

describe("NodesOnboardPartyContainer", () => {
  it("renders without throwing", () => {
    const { container } = render(<NodesOnboardPartyContainer members={[]} />);

    expect(container).toBeInTheDocument();
  });
});

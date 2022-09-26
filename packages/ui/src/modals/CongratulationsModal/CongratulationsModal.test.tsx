import { render } from "../../../utils/jest-apollo";
import { CongratulationsModal } from ".";

describe("CongratulationsModal", () => {
  it("renders without throwing", () => {
    const { container } = render(<CongratulationsModal openModal={true} />);

    expect(container).toBeInTheDocument();
  });
});

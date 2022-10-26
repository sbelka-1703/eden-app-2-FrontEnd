import { render } from "../../../utils/jest-apollo";
import { ReviewModal } from ".";
import { mockData } from "./MockData";

describe("ReviewModal", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <ReviewModal
        data={mockData}
        onSubmit={function (): void {
          throw new Error("Function not implemented.");
        }}
        onClose={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    );

    expect(container).toBeInTheDocument();
  });
});

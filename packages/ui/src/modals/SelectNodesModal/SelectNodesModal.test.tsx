import { render } from "../../../utils/jest-apollo";
import { SelectNodesModal } from ".";

describe("SelectNodesModal", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <SelectNodesModal
        onClose={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    );

    expect(container).toBeInTheDocument();
  });
});

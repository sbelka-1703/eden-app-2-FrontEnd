import { render } from "../../../utils/jest-apollo";
import { FindTalentModal } from ".";

describe("FindTalentModal", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <FindTalentModal
        onClose={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    );

    expect(container).toBeInTheDocument();
  });
});

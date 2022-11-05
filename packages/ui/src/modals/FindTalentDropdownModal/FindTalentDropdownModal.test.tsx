import { render } from "../../../utils/jest-apollo";
import { FindTalentDropdownModal } from ".";

describe("FindTalentDropdownModal", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <FindTalentDropdownModal
        onClose={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    );

    expect(container).toBeInTheDocument();
  });
});

import { render } from "../../../utils/jest-apollo";
import { TestDiscoverTalentDropdownModal } from ".";

describe("TestDiscoverTalentDropdownModal", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <TestDiscoverTalentDropdownModal
        onNext={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    );

    expect(container).toBeInTheDocument();
  });
});

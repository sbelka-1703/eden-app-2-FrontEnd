import { render } from "../../../utils/jest-apollo";
import { DiscoverTalentDropdownModal } from ".";

describe("DiscoverTalentDropdownModal", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <DiscoverTalentDropdownModal
        onClose={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    );

    expect(container).toBeInTheDocument();
  });
});

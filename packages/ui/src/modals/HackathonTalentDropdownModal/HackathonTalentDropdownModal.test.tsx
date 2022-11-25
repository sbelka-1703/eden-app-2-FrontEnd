import { render } from "../../../utils/jest-apollo";
import { HackathonTalentDropdownModal } from ".";

describe("HackathonTalentDropdownModal", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <HackathonTalentDropdownModal
        onClose={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    );

    expect(container).toBeInTheDocument();
  });
});

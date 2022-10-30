import { render } from "../../../utils/jest-apollo";
import { ProfileModal } from ".";

describe("ProfileModal", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <ProfileModal
        member={{}}
        onClose={function (): void {
          throw new Error("Function not implemented.");
        }}
        onInvite={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    );

    expect(container).toBeInTheDocument();
  });
});

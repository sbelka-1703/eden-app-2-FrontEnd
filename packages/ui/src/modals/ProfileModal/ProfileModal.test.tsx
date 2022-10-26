import { render } from "../../../utils/jest-apollo";
import { ProfileModal } from ".";

describe("ProfileModal", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <ProfileModal
        member={{}}
        onInvite={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    );

    expect(container).toBeInTheDocument();
  });
});

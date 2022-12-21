import { getMember } from "@eden/package-mock";

// import { render } from "@testing-library/react";
import { render } from "../../../utils/jest-apollo";
import { UserInviteModal } from "./UserInviteModal";

describe("UserInviteModal", () => {
  it("renders without throwing", () => {
    const { container } = render(<UserInviteModal member={getMember()} />);

    expect(container).toBeInTheDocument();
  });
});

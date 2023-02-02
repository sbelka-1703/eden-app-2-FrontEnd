import { render } from "@testing-library/react";

import { AvatarMemberList } from "./AvatarMemberList";

describe("AvatarMemberList", () => {
  it("renders without throwing", () => {
    const { container } = render(<AvatarMemberList members={[]} />);

    expect(container).toBeInTheDocument();
  });
});

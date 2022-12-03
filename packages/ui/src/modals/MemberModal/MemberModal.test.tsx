import { render } from "@testing-library/react";

import { MemberModal } from "./MemberModal";

describe("MemberModal", () => {
  it("renders without throwing", () => {
    const { container } = render(<MemberModal />);

    expect(container).toBeInTheDocument();
  });
});

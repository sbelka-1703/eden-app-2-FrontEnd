import { render } from "@testing-library/react";

import { GrantsModal } from "./GrantsModal";

describe("GrantsModal", () => {
  it("renders without throwing", () => {
    const { container } = render(<GrantsModal />);

    expect(container).toBeInTheDocument();
  });
});

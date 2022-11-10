import { render } from "@testing-library/react";

import { ProfileExpandedModal } from "./ProfileExpandedModal";

describe("ProfileExpandedModal", () => {
  it("renders without throwing", () => {
    const { container } = render(<ProfileExpandedModal />);

    expect(container).toBeInTheDocument();
  });
});

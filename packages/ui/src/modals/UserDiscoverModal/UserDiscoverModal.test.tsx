import { render } from "@testing-library/react";

import { UserDiscoverModal } from "./UserDiscoverModal";

describe("UserDiscoverModal", () => {
  it("renders without throwing", () => {
    const { container } = render(<UserDiscoverModal />);

    expect(container).toBeInTheDocument();
  });
});

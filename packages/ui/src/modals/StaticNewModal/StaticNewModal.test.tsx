import { render } from "@testing-library/react";

import { StaticNewModal } from "./StaticNewModal";

describe("StaticNewModal", () => {
  it("renders without throwing", () => {
    const { container } = render(<StaticNewModal />);

    expect(container).toBeInTheDocument();
  });
});

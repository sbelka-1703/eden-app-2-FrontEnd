import { render } from "@testing-library/react";

import { StaticModal } from "./StaticModal";

describe("StaticModal", () => {
  it("renders without throwing", () => {
    const { container } = render(<StaticModal />);

    expect(container).toBeInTheDocument();
  });
});

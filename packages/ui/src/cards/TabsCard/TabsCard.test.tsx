import { render } from "@testing-library/react";

import { TabsCard } from "./";

describe("TabsCard", () => {
  it("renders without throwing", () => {
    const { container } = render(<TabsCard />);

    expect(container).toBeInTheDocument();
  });
});

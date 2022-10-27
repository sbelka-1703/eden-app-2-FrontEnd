import { render } from "@testing-library/react";

import { ProjectStatusCard } from "./";

describe("ProjectStatusCard", () => {
  it("renders without throwing", () => {
    const { container } = render(<ProjectStatusCard />);

    expect(container).toBeInTheDocument();
  });
});

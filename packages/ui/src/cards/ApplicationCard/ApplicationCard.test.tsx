import { render } from "@testing-library/react";

import { ApplicationCard } from "./ApplicationCard";

describe("ApplicationCard", () => {
  it("renders without throwing", () => {
    const { container } = render(<ApplicationCard />);

    expect(container).toBeInTheDocument();
  });
});

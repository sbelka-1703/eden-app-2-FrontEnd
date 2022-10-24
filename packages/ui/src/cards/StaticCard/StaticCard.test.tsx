import { render } from "@testing-library/react";

import { StaticCard } from "./StaticCard";

describe("StaticCard", () => {
  it("renders without throwing", () => {
    const { container } = render(<StaticCard />);

    expect(container).toBeInTheDocument();
  });
});

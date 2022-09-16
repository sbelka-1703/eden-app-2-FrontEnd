import { render } from "@testing-library/react";

import { ProjectMatchCard } from ".";

describe("ProjectMatchCard", () => {
  it("renders without throwing", () => {
    const { container } = render(<ProjectMatchCard project={{}} />);

    expect(container).toBeInTheDocument();
  });
});

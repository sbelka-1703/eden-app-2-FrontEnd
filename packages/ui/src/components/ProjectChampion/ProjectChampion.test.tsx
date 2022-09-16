import { render } from "@testing-library/react";

import { ProjectChampion } from "./ProjectChampion";

describe("ProjectChampion", () => {
  it("renders without throwing", () => {
    const { container } = render(<ProjectChampion member={{}} />);

    expect(container).toBeInTheDocument();
  });
});

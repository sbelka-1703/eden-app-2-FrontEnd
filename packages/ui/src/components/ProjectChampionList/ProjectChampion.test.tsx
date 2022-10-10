import { render } from "@testing-library/react";

import { ProjectChampion } from "./ProjectChampionList";

describe("ProjectChampion", () => {
  it("renders without throwing", () => {
    const { container } = render(<ProjectChampion member={{}} />);

    expect(container).toBeInTheDocument();
  });
});

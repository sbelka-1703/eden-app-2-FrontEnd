import { render } from "@testing-library/react";

import { ProjectChampionList } from "./ProjectChampionList";

describe("ProjectChampionList", () => {
  it("renders without throwing", () => {
    const { container } = render(<ProjectChampionList />);

    expect(container).toBeInTheDocument();
  });
});

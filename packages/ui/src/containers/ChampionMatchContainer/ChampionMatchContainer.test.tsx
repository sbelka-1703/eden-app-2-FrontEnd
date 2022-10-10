import { render } from "@testing-library/react";

import { ChampionMatchContainer } from ".";

describe("ChampionMatchContainer", () => {
  it("renders without throwing", () => {
    const { container } = render(<ChampionMatchContainer />);

    expect(container).toBeInTheDocument();
  });
});

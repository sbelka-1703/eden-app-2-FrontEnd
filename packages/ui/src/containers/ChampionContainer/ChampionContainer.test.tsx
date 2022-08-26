import { render } from "@testing-library/react";

import { ChampionContainer } from "./";

describe("ChampionContainer", () => {
  it("renders without throwing", () => {
    const { container } = render(<ChampionContainer />);

    expect(container).toBeInTheDocument();
  });
});

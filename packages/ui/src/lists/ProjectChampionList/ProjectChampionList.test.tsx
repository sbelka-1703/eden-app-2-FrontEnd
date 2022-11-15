import { render } from "@testing-library/react";

import { ProjectChampionList } from "./ProjectChampionList";
jest.mock("next/router", () => require("next-router-mock"));

describe("ProjectChampionList", () => {
  it("renders without throwing", () => {
    const { container } = render(<ProjectChampionList />);

    expect(container).toBeInTheDocument();
  });
});

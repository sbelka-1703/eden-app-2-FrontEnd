import { render } from "../../../utils/jext-apollo";
// import { render } from "@testing-library/react";
import { ChampionRecruitContainer } from "./";

describe("ChampionRecruitContainer", () => {
  it("renders without throwing", () => {
    const { container } = render(<ChampionRecruitContainer />);

    expect(container).toBeInTheDocument();
  });
});

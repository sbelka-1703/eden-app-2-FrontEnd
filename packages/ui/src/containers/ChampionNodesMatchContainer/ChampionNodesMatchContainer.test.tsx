import {
  getProject,
  getRoleTypeMock,
  matchNodesToMembersMockArray,
} from "@eden/package-mock";

// import { render } from "@testing-library/react";
import { render } from "../../../utils/jest-apollo";
import { ChampionNodesMatchContainer } from ".";

describe("ChampionNodesMatchContainer", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <ChampionNodesMatchContainer
        project={getProject()}
        matchingMembers={matchNodesToMembersMockArray(8)}
        selectedRole={getRoleTypeMock()}
      />
    );

    expect(container).toBeInTheDocument();
  });
});

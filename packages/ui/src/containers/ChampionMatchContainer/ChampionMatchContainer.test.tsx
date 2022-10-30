import { Members } from "@eden/package-graphql/generated";
import { render } from "@testing-library/react";

import { ChampionMatchContainer } from ".";

describe("ChampionMatchContainer", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <ChampionMatchContainer
        onSelectMember={function (member: Members): void {
          console.log(member);

          throw new Error("Function not implemented.");
        }}
      />
    );

    expect(container).toBeInTheDocument();
  });
});

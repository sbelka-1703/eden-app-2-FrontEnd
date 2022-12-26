import {
  getProject,
  getRoleTypeMock,
  matchNodesToMembersMockArray,
} from "@eden/package-mock";
import userEvent from "@testing-library/user-event";

// import { render } from "@testing-library/react";
import { render, screen } from "../../../utils/jest-apollo";
import { ChampionNodesMatchContainer } from ".";
const user = userEvent.setup();

test("renders without throwing", async () => {
  render(
    <ChampionNodesMatchContainer
      project={getProject()}
      matchingMembers={matchNodesToMembersMockArray(8)}
      selectedRole={getRoleTypeMock()}
    />
  );
  await user.click(screen.getAllByText("More")[0]);
  screen.debug(undefined, Infinity);

  expect(screen.getByText("PREFERRED PROJECTS")).toBeTruthy();
  await user.click(screen.getByRole("button", { name: "Invite" }));
  await user.click(screen.getByRole("button", { name: "Cancel Message" }));
});

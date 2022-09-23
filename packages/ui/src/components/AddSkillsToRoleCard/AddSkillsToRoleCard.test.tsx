import { render } from "@testing-library/react";

import { AddSkillsToRoleCard } from ".";

describe("AddSkillsToRoleCard", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <AddSkillsToRoleCard
        numberOfMembers={0}
        roleTitle={""}
        handleOpenSkillsModal={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    );

    expect(container).toBeInTheDocument();
  });
});

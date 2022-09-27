import { Maybe, RoleTemplate } from "@graphql/eden/generated";

import { render } from "../../../utils/jest-apollo";
import { ProjectInfoModal } from ".";

describe("ProjectInfoModal", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <ProjectInfoModal
        onSubmit={function (role: Maybe<RoleTemplate>): void {
          console.log(role);

          throw new Error("Function not implemented.");
        }}
      />
    );

    expect(container).toBeInTheDocument();
  });
});

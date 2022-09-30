import { Maybe, RoleTemplate } from "@eden/package-graphql/generated";

import { render } from "../../../utils/jest-apollo";
import { RoleModal } from ".";

describe("RoleModal", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <RoleModal
        onSubmit={function (role: Maybe<RoleTemplate>): void {
          console.log(role);

          throw new Error("Function not implemented.");
        }}
      />
    );

    expect(container).toBeInTheDocument();
  });
});

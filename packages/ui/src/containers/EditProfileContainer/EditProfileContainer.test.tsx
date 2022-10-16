import { Members } from "@eden/package-graphql/generated";

import { render } from "../../../utils/jest-apollo";
import { EditProfileContainer } from ".";

describe("EditProfileContainer", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <EditProfileContainer
        onSave={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    );

    expect(container).toBeInTheDocument();
  });
});

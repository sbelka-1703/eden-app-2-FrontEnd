import { render } from "@testing-library/react";

import { ViewUserProfileContainer } from ".";

describe("ViewUserProfileContainer", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <ViewUserProfileContainer
        experienceOpen={null}
        // eslint-disable-next-line no-unused-vars
        setExperienceOpen={function (val: any): void {
          throw new Error("Function not implemented.");
        }}
      />
    );

    expect(container).toBeInTheDocument();
  });
});

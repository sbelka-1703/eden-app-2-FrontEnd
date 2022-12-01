import { render } from "@testing-library/react";

import { UserBackground } from ".";

describe("UserBackground", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <UserBackground
        background={undefined}
        initialEndorsements={[]}
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

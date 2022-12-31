import { RoleType } from "@eden/package-graphql/generated";
import { render } from "@testing-library/react";

import { CreateProjectViews7 } from ".";

describe("CreateProjectViews7", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <CreateProjectViews7
        onBack={function (): void {
          throw new Error("Function not implemented.");
        }}
        battery={2}
        setBattery={function (): void {
          throw new Error("Function not implemented.");
        }}
        onNext={function (data): void {
          console.info({ data });
          throw new Error("Function not implemented.");
        }}
        // eslint-disable-next-line no-unused-vars
        onChange={function (data: RoleType): void {
          throw new Error("Function not implemented.");
        }}
      />
    );

    expect(container).toBeInTheDocument();
  });
});

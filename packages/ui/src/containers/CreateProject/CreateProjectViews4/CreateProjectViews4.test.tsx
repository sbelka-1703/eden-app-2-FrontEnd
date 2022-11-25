import { render } from "@testing-library/react";

import { CreateProjectViews4 } from ".";

describe("CreateProjectViews4", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <CreateProjectViews4
        onBack={function (): void {
          throw new Error("Function not implemented.");
        }}
        onNext={function (data): void {
          console.info({ data });
          throw new Error("Function not implemented.");
        }}
      />
    );

    expect(container).toBeInTheDocument();
  });
});

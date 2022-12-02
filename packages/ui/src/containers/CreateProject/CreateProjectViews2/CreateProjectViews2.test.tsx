import { render } from "@testing-library/react";

import { CreateProjectViews2 } from ".";

describe("CreateProjectViews2", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <CreateProjectViews2
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

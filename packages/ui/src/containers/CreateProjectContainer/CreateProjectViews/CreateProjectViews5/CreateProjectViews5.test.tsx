import { render } from "@testing-library/react";

import { CreateProjectViews5 } from ".";

describe("CreateProjectViews5", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <CreateProjectViews5
        battery={2}
        onBack={function (): void {
          throw new Error("Function not implemented.");
        }}
        onNext={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    );

    expect(container).toBeInTheDocument();
  });
});

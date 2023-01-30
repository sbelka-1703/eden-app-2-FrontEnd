import { render } from "@testing-library/react";

import { CreateProjectViews3 } from ".";

describe("CreateProjectViews3", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <CreateProjectViews3
        battery={2}
        onBack={function (): void {
          throw new Error("Function not implemented.");
        }}
        onSkip={function (): void {
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

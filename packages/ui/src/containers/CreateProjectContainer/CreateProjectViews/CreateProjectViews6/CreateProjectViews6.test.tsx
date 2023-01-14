import { render } from "@testing-library/react";

import { CreateProjectViews6 } from ".";

describe("CreateProjectViews6", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <CreateProjectViews6
        onBack={function (): void {
          throw new Error("Function not implemented.");
        }}
        onLaunch={function (): void {
          throw new Error("Function not implemented.");
        }}
        onNewPosition={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    );

    expect(container).toBeInTheDocument();
  });
});

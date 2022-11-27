import { render } from "@testing-library/react";

import { CreateProjectVeiws6 } from ".";

describe("CreateProjectVeiws6", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <CreateProjectVeiws6
        onBack={function (): void {
          throw new Error("Function not implemented.");
        }}
        onNext={function (): void {
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

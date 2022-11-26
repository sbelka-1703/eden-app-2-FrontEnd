import { render } from "@testing-library/react";

import { CreateProjectVeiws3 } from ".";

describe("CreateProjectVeiws3", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <CreateProjectVeiws3
        onBack={function (): void {
          throw new Error("Function not implemented.");
        }}
        onSkip={function (): void {
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

import { render } from "@testing-library/react";

import { CreateProjectVeiws1 } from ".";

describe("CreateProjectVeiws1", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <CreateProjectVeiws1
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

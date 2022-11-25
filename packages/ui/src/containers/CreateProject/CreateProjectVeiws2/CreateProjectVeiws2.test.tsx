import { render } from "@testing-library/react";

import { CreateProjectVeiws2 } from ".";

describe("CreateProjectVeiws2", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <CreateProjectVeiws2
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

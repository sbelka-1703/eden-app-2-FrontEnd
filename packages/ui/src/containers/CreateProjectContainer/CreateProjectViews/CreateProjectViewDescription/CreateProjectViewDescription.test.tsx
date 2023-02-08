import { render } from "@testing-library/react";

import { CreateProjectViewDescription } from ".";

describe("CreateProjectViewDescription", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <CreateProjectViewDescription
        onBack={function (): void {
          throw new Error("Function not implemented.");
        }}
        battery={2}
        onNext={function (): void {
          throw new Error("Function not implemented.");
        }}
        setProject={function (data): void {
          console.info({ data });
        }}
      />
    );

    expect(container).toBeInTheDocument();
  });
});

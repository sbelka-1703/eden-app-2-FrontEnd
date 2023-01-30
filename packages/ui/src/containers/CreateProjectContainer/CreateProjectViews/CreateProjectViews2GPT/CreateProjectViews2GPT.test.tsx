import { render } from "@testing-library/react";

import { CreateProjectViews2GPT } from ".";

describe("CreateProjectViews2GPT", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <CreateProjectViews2GPT
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

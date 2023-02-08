import { render } from "@testing-library/react";

import { SkipFlowModal } from ".";

describe("SkipFlowModal", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <SkipFlowModal
        onSkipStep={function (): void {
          throw new Error("Function not implemented.");
        }}
        onSkipFlow={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    );

    expect(container).toBeInTheDocument();
  });
});

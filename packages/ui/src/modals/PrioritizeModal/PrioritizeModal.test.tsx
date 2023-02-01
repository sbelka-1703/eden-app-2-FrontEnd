import { render } from "@testing-library/react";

import { PrioritizeModal } from ".";

describe("PrioritizeModal", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <PrioritizeModal
        onClose={function (): void {
          throw new Error("Function not implemented.");
        }}
        onSubmit={function (data): void {
          console.log(data);

          throw new Error("Function not implemented.");
        }}
      />
    );

    expect(container).toBeInTheDocument();
  });
});

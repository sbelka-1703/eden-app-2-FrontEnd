import { render } from "@testing-library/react";

import { ReviewModal } from ".";
import { mockData } from "./MockData";

describe("ReviewModal", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <ReviewModal
        data={mockData}
        onClose={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    );

    expect(container).toBeInTheDocument();
  });
});

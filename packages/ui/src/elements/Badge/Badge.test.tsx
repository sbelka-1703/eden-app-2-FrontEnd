import { render } from "@testing-library/react";

import { Badge } from "./";

describe("Badge", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <Badge
        colorRGB="236, 240, 71"
        text="Design"
        onClose={() => console.log("")}
      />
    );

    expect(container).toBeInTheDocument();
  });
});

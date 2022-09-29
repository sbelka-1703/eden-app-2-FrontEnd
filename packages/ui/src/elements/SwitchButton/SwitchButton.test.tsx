import { render } from "@testing-library/react";

import { SwitchButton } from ".";

describe("SwitchButton", () => {
  it("renders without throwing", () => {
    const { container } = render(<SwitchButton />);

    expect(container).toBeInTheDocument();
  });
});

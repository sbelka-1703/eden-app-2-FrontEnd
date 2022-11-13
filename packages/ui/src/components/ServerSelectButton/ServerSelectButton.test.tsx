import { render } from "@testing-library/react";

import { ServerSelectButton } from "./ServerSelectButton";

describe("ServerSelectButton", () => {
  it("renders without throwing", () => {
    const { container } = render(<ServerSelectButton inApp={true} />);

    expect(container).toBeInTheDocument();
  });
});

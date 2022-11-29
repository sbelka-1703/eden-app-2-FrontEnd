import { render } from "@testing-library/react";

import { GrantsInfo } from "./GrantsInfo";

describe("GrantsInfo", () => {
  it("renders without throwing", () => {
    const { container } = render(<GrantsInfo />);

    expect(container).toBeInTheDocument();
  });
});

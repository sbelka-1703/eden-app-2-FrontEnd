import { render } from "@testing-library/react";

import { MyProjectContainer } from "./";

describe("MyProjectContainer", () => {
  it("renders without throwing", () => {
    const { container } = render(<MyProjectContainer />);

    expect(container).toBeInTheDocument();
  });
});

import { render } from "@testing-library/react";

import { ProfileContainer } from "./";

describe("ProfileContainer", () => {
  it("renders without throwing", () => {
    const { container } = render(<ProfileContainer />);

    expect(container).toBeInTheDocument();
  });
});

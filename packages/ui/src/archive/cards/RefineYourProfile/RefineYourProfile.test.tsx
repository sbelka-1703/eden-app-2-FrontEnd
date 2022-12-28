import { render } from "@testing-library/react";

import { RefineYourProfile } from ".";

describe("RefineYourProfile", () => {
  it("renders without throwing", () => {
    const { container } = render(<RefineYourProfile />);

    expect(container).toBeInTheDocument();
  });
});

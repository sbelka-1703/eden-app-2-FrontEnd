import { render } from "@testing-library/react";

import { RoleCandidateSelector } from "./";

describe("RoleCandidateSelector", () => {
  it("renders without throwing", () => {
    const { container } = render(<RoleCandidateSelector />);

    expect(container).toBeInTheDocument();
  });
});

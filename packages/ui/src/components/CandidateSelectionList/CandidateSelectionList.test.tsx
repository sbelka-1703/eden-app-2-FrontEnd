import { render } from "@testing-library/react";

import { CandidateSelectionList } from "./";

describe("CandidateSelectionList", () => {
  it("renders without throwing", () => {
    const { container } = render(<CandidateSelectionList />);

    expect(container).toBeInTheDocument();
  });
});

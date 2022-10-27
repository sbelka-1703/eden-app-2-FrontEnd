import { render } from "@testing-library/react";

import { CandidateSelectionList } from "./";

describe("CandidateSelectionList", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <CandidateSelectionList onSelectMember={(val) => console.log(val)} />
    );

    expect(container).toBeInTheDocument();
  });
});

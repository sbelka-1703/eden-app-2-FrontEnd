import { render } from "@testing-library/react";

import { CandidateProfileCard } from ".";

describe("CandidateProfileCard", () => {
  it("renders without throwing", () => {
    const { container } = render(<CandidateProfileCard />);

    expect(container).toBeInTheDocument();
  });
});

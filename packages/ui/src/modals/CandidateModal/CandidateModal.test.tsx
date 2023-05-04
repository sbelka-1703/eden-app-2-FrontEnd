import { MockedProvider } from "@apollo/client/testing";
import { getMember } from "@eden/package-mock";
import { render } from "@testing-library/react";

import { CandidateModal } from "./CandidateModal";

describe("CandidateModal", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <MockedProvider>
        <CandidateModal member={getMember()} />
      </MockedProvider>
    );

    expect(container).toBeInTheDocument();
  });
});

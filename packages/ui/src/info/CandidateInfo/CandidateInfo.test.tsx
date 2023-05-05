import { MockedProvider } from "@apollo/client/testing";
import { getMember } from "@eden/package-mock";
import { render } from "@testing-library/react";

import { CandidateInfo } from "./CandidateInfo";

describe("CandidateInfo", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <MockedProvider>
        <CandidateInfo member={getMember()} />
      </MockedProvider>
    );

    expect(container).toBeInTheDocument();
  });
});

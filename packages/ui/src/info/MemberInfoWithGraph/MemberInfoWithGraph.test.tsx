import { MockedProvider } from "@apollo/client/testing";
import { getMember } from "@eden/package-mock";
import { render } from "@testing-library/react";

import { MemberInfoWithGraph } from "./MemberInfoWithGraph";

describe("MemberInfoWithGraph", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <MockedProvider>
        <MemberInfoWithGraph member={getMember()} />
      </MockedProvider>
    );

    expect(container).toBeInTheDocument();
  });
});

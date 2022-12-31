import { MockedProvider } from "@apollo/client/testing";
import { getMember } from "@eden/package-mock";
import { render } from "@testing-library/react";

import { MemberInfo } from "./MemberInfo";

describe("MemberInfo", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <MockedProvider>
        <MemberInfo member={getMember()} />
      </MockedProvider>
    );

    expect(container).toBeInTheDocument();
  });
});

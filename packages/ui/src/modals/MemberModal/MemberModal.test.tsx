import { MockedProvider } from "@apollo/client/testing";
import { getMember } from "@eden/package-mock";
import { render } from "@testing-library/react";

import { MemberModal } from "./MemberModal";

describe("MemberModal", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <MockedProvider>
        <MemberModal member={getMember()} />
      </MockedProvider>
    );

    expect(container).toBeInTheDocument();
  });
});

import { MockedProvider } from "@apollo/client/testing";
import { render } from "@testing-library/react";

import { MemberModal } from "./MemberModal";

describe("MemberModal", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <MockedProvider>
        <MemberModal />
      </MockedProvider>
    );

    expect(container).toBeInTheDocument();
  });
});

import { MockedProvider } from "@apollo/client/testing";
import { render } from "@testing-library/react";

import { GrantsModal } from "./GrantsModal";

describe("GrantsModal", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <MockedProvider>
        <GrantsModal />
      </MockedProvider>
    );

    expect(container).toBeInTheDocument();
  });
});

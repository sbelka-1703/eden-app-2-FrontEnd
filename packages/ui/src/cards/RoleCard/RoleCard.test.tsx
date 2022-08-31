// import { render } from "../../../utils/jext-apollo";
import { MockedProvider } from "@apollo/client/testing";
import { render } from "@testing-library/react";

import { RoleCard } from ".";

describe("RoleCard", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <MockedProvider>
        <RoleCard />
      </MockedProvider>
    );

    expect(container).toBeInTheDocument();
  });
});

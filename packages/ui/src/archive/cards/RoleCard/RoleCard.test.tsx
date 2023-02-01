import { MockedProvider } from "@apollo/client/testing";
import { render } from "@testing-library/react";

import { RoleCard } from ".";

describe("RoleCard", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <MockedProvider>
        <RoleCard onApply={(val) => console.log(val)} />
      </MockedProvider>
    );

    expect(container).toBeInTheDocument();
  });
});

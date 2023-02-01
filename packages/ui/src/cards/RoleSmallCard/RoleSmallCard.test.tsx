import { MockedProvider } from "@apollo/client/testing";
import { render } from "@testing-library/react";

import { RoleSmallCard } from ".";

describe("RoleCard", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <MockedProvider>
        <RoleSmallCard role={null} isSelected={false} />
      </MockedProvider>
    );

    expect(container).toBeInTheDocument();
  });
});

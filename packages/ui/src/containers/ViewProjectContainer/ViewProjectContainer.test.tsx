import { render } from "@testing-library/react";

import { ViewProjectContainer } from ".";

describe("ViewProjectContainer", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <ViewProjectContainer
        roleIndex={0}
        onSetRoleIndex={(val) => console.log(val)}
      />
    );

    expect(container).toBeInTheDocument();
  });
});

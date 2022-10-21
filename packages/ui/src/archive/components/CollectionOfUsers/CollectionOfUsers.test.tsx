import { getMemberArray } from "@eden/package-mock";
import { render } from "@testing-library/react";

import { CollectionOfUsers } from ".";

describe("CollectionOfUsers", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <CollectionOfUsers members={getMemberArray(9)} />
    );

    expect(container).toBeInTheDocument();
  });
});

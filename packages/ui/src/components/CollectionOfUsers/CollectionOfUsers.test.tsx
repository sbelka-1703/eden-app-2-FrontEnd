import { render } from "@testing-library/react";

import { CollectionOfUsers } from ".";

describe("CollectionOfUsers", () => {
  it("renders without throwing", () => {
    const { container } = render(<CollectionOfUsers />);

    expect(container).toBeInTheDocument();
  });
});

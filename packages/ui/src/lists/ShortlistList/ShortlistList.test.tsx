import { render } from "@testing-library/react";

import { ShortlistList } from "./";

describe("ShortlistList", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <ShortlistList onSelectMember={(val) => console.log(val)} />
    );

    expect(container).toBeInTheDocument();
  });
});

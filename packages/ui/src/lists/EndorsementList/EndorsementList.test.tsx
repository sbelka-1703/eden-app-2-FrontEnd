import { render } from "@testing-library/react";

import { EndorsementList } from "./EndorsementList";

describe("EndorsementList", () => {
  it("renders without throwing", () => {
    const { container } = render(<EndorsementList endorsements={[]} />);

    expect(container).toBeInTheDocument();
  });
});

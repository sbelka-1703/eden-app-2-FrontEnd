import { render } from "@testing-library/react";

import { EndorsementCard } from ".";

describe("EndorsementCard", () => {
  it("renders without throwing", () => {
    const { container } = render(<EndorsementCard endoresement={{}} />);

    expect(container).toBeInTheDocument();
  });
});

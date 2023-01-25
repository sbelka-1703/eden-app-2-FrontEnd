import { MockedProvider } from "@apollo/client/testing";
import { render } from "@testing-library/react";

import { EndorsementCard } from ".";

describe("EndorsementCard", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <MockedProvider>
        <EndorsementCard endoresement={{}} />
      </MockedProvider>
    );

    expect(container).toBeInTheDocument();
  });
});

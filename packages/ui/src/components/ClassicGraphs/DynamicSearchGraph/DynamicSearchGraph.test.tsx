import { MockedProvider } from "@apollo/client/testing";
import { render } from "@testing-library/react";

import { DynamicSearchGraph } from ".";

describe("SendMessageToUserModal", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <MockedProvider>
        <DynamicSearchGraph nodesID={[""]} />
      </MockedProvider>
    );

    expect(container).toBeInTheDocument();
  });
});

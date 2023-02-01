import { MockedProvider } from "@apollo/client/testing";
import { render } from "@testing-library/react";

import { SendMessageToChampion } from ".";

describe("SendMessageToUserModal", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <MockedProvider>
        <SendMessageToChampion />
      </MockedProvider>
    );

    expect(container).toBeInTheDocument();
  });
});

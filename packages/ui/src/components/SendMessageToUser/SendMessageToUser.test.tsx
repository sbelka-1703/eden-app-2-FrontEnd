import { MockedProvider } from "@apollo/client/testing";
import { render } from "@testing-library/react";

import { SendMessageToUser } from ".";

describe("SendMessageToUser", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <MockedProvider>
        <SendMessageToUser member={{}} />
      </MockedProvider>
    );

    expect(container).toBeInTheDocument();
  });
});

import { MockedProvider } from "@apollo/client/testing";
import { render } from "@testing-library/react";

import { SendMessageUserToUser } from ".";

describe("SendMessageUserToUser", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <MockedProvider>
        <SendMessageUserToUser member={{}} />
      </MockedProvider>
    );

    expect(container).toBeInTheDocument();
  });
});

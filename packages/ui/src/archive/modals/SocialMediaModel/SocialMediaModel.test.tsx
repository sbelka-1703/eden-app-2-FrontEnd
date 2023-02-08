import { MockedProvider } from "@apollo/client/testing";
import { render } from "@testing-library/react";

import { SocialMediaModel } from ".";

describe("SocialMediaModel", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <MockedProvider>
        <SocialMediaModel />
      </MockedProvider>
    );

    expect(container).toBeInTheDocument();
  });
});

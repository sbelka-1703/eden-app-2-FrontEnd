import { render } from "@testing-library/react";

import { SocialMediaInput } from ".";

describe("SocialMediaInput", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <SocialMediaInput
        platform="twitter"
        onChange={() => {
          //
        }}
      />
    );

    expect(container).toBeInTheDocument();
  });
});

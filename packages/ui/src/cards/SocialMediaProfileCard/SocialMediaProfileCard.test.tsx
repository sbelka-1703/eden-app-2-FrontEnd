// import { render } from "../../../utils/jest-apollo";
import { MockedProvider } from "@apollo/client/testing";
import { render } from "@testing-library/react";

import { SocialMediaProfileCard } from ".";

describe("SocialMediaProfileCard", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <MockedProvider>
        <SocialMediaProfileCard />
      </MockedProvider>
    );

    expect(container).toBeInTheDocument();
  });
});

// import { render } from "../../../utils/jest-apollo";
import { MockedProvider } from "@apollo/client/testing";
import { render } from "@testing-library/react";

import { ProjectRecommendedCard } from ".";

describe("ProjectRecommendedCard", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <MockedProvider>
        <ProjectRecommendedCard />
      </MockedProvider>
    );

    expect(container).toBeInTheDocument();
  });
});

import { MockedProvider } from "@apollo/client/testing";
import { render } from "@testing-library/react";

import { ProjectRecommendedCard } from ".";
jest.mock("next/router", () => require("next-router-mock"));

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

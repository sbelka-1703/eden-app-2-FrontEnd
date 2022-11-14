// import { render } from "../../../utils/jest-apollo";
import { MockedProvider } from "@apollo/client/testing";
import { render } from "@testing-library/react";

import { ProjectAboutCard } from ".";
jest.mock("next/router", () => require("next-router-mock"));

describe("ProjectAboutCard", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <MockedProvider>
        <ProjectAboutCard />
      </MockedProvider>
    );

    expect(container).toBeInTheDocument();
  });
});

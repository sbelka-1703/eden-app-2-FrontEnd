import { MockedProvider } from "@apollo/client/testing";
import { render } from "@testing-library/react";

import { CreateProjectTempContainer } from ".";

describe("CreateProjectTempContainer", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <MockedProvider>
        <CreateProjectTempContainer
          setProjectUIdata={(val) => console.log(val)}
          setSelectedRole={(val) => console.log(val)}
          onFetchProject={() => console.log("change = ")}
        />
      </MockedProvider>
    );

    expect(container).toBeInTheDocument();
  });
});

import { MockedProvider } from "@apollo/client/testing";
import { render } from "@testing-library/react";

import { EditProjectModal } from ".";

describe("EditProjectModal", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <MockedProvider>
        <EditProjectModal />
      </MockedProvider>
    );

    expect(container).toBeInTheDocument();
  });
});

import { MockedProvider } from "@apollo/client/testing";
import { render } from "@testing-library/react";

import { DynamicSearchMemberGraph } from ".";

describe("SendMessageToUserModal", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <MockedProvider>
        <DynamicSearchMemberGraph
          nodesID={[""]}
          memberID={"908392557258604544"}
        />
      </MockedProvider>
    );

    expect(container).toBeInTheDocument();
  });
});

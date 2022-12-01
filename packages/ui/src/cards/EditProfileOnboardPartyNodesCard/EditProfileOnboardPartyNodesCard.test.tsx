// import { render } from "../../../utils/jest-apollo";
import { MockedProvider } from "@apollo/client/testing";
import { render } from "@testing-library/react";

import { EditProfileOnboardPartyNodesCard } from ".";

describe("EditProfileOnboardPartyNodesCard", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <MockedProvider>
        <EditProfileOnboardPartyNodesCard
          handleUpdateUser={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
      </MockedProvider>
    );

    expect(container).toBeInTheDocument();
  });
});

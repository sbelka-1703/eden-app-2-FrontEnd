import { render } from "@testing-library/react";

import { RoleDescriptionModal } from ".";

describe("RoleDescriptionModal", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <RoleDescriptionModal
        isModalOpen={true}
        roles={[
          {
            _id: 1,
            title: "Solidity Engineer",
          },
          {
            _id: 2,
            title: "Designer",
          },
          {
            _id: 3,
            title: "Forntend",
          },
          {
            _id: 4,
            title: "Backend",
          },
        ]}
        handleSubmit={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    );

    expect(container).toBeInTheDocument();
  });
});

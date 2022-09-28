import { render } from "../../../utils/jest-apollo";
import { RoleDescriptionModal } from ".";

describe("ProjectInfoModal", () => {
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
      />
    );

    expect(container).toBeInTheDocument();
  });
});

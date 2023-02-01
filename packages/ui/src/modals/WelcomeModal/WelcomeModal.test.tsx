import { render } from "@testing-library/react";

import { WelcomeModal } from ".";

describe("WelcomeModal", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <WelcomeModal
        profilePercentage={30}
        canSeeProjects={false}
        canProjectsSee={false}
        openModal={true}
        onNext={() => {
          throw new Error("Function not implemented.");
        }}
      />
    );

    expect(container).toBeInTheDocument();
  });
});

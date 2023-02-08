import { render } from "@testing-library/react";

import { WarningModal } from ".";

describe("WarningModal", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <WarningModal
        onSkip={function (): void {
          throw new Error("Function not implemented.");
        }}
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

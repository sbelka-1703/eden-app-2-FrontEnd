import { render } from "@testing-library/react";

import { PreferencesModal } from ".";

describe("PreferencesModal", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <PreferencesModal
        onClose={function (): void {
          throw new Error("Function not implemented.");
        }}
        onSubmit={function (data): void {
          console.log(data);

          throw new Error("Function not implemented.");
        }}
      />
    );

    expect(container).toBeInTheDocument();
  });
});

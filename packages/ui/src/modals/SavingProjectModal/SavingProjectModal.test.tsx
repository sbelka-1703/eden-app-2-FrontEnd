import { render } from "@testing-library/react";

import { SavingProjectModal } from ".";

describe("SavingProjectModal", () => {
  it("renders without throwing", () => {
    const { container } = render(<SavingProjectModal />);

    expect(container).toBeInTheDocument();
  });
});

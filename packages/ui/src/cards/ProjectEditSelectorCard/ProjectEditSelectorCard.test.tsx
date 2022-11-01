import { render } from "@testing-library/react";

import { ProjectEditSelectorCard } from ".";

describe("ProjectEditSelectorCard", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <ProjectEditSelectorCard
        handleSelectRole={() => console.log("handleSelectRole")}
      />
    );

    expect(container).toBeInTheDocument();
  });
});

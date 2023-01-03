import { render } from "@testing-library/react";

import { ProjectMatchList } from "./";

describe("ProjectMatchList", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <ProjectMatchList
        onSelectedProject={() => console.log("test")}
        onViewProject={(val) => console.log(val)}
      />
    );

    expect(container).toBeInTheDocument();
  });
});

import { render } from "@testing-library/react";

import { SelectBoxNode } from ".";

describe("SelectBoxNode", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <SelectBoxNode
        caption="Select item"
        items={[
          "Wade Cooper",
          "Arlene Mccoy",
          "Devon Webb",
          "Tom Cook",
          "Tanya Fox",
          "Hellen Schmidt",
        ]}
      />
    );

    expect(container).toBeInTheDocument();
  });
});

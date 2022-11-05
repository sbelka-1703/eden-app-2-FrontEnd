import { render } from "@testing-library/react";

import { SelectBox } from "./";

describe("SelectBox", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <SelectBox
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

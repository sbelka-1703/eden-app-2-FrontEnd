import { render } from "@testing-library/react";

import { TabsSelector } from "./";

const tabs = ["All projects", "Favourites", "Recommended"];

describe("TabsSelector", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <TabsSelector tabs={tabs} onSelect={(val) => console.log(val)} />
    );

    expect(container).toBeInTheDocument();
  });
});

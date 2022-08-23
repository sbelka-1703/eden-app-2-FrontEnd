import { render } from "@testing-library/react";

import { TabsCard } from "./";

const tabs = ["All projects", "Favourites", "Recommended"];

describe("TabsCard", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <TabsCard tabs={tabs} onSelect={(val) => console.log(val)} />
    );

    expect(container).toBeInTheDocument();
  });
});

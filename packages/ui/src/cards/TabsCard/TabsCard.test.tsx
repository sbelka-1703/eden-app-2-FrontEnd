import { render } from "@testing-library/react";

import { TabsCard } from "./";

const tabs = [
  {
    title: "All projects",
    fullTitle: "All projects",
  },
  {
    title: "Favourites",
    fullTitle: "Favourites",
  },
  {
    title: "Recommended",
    fullTitle: "Recommended",
  },
];

describe("TabsCard", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <TabsCard tabs={tabs} onSelect={(val) => console.log(val)} />
    );

    expect(container).toBeInTheDocument();
  });
});

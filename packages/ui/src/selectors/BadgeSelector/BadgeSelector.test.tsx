import { render } from "@testing-library/react";

import { BadgeSelector } from ".";

describe("BadgeSelector", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <BadgeSelector
        items={[]}
        // eslint-disable-next-line no-unused-vars
        onChange={function (value: any): void {
          throw new Error("Function not implemented.");
        }}
      />
    );

    expect(container).toBeInTheDocument();
  });
});

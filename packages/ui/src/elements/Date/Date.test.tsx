import { render } from "@testing-library/react";

import { Date } from "./";

describe("Date", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <Date type="primary" dayOfMonth={22} month="AUG" year={22} />
    );

    expect(container).toBeInTheDocument();
  });
});

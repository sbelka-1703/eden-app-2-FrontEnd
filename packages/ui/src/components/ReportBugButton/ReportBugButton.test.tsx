import { render } from "@testing-library/react";

import { ReportBugButton } from ".";

describe("ReportBugButton", () => {
  it("renders without throwing", () => {
    const { container } = render(<ReportBugButton />);

    expect(container).toBeInTheDocument();
  });
});

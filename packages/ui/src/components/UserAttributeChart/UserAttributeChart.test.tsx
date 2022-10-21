import { render } from "@testing-library/react";

import { UserAttributeChart } from ".";
import { mockCompanyData } from "./mockData";

describe("UserAttributeChart", () => {
  it("renders without throwing an error", () => {
    const { container } = render(
      <UserAttributeChart companies={mockCompanyData} />
    );

    expect(container).toBeInTheDocument();
  });
});

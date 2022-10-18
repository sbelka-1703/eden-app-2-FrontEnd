import { render } from "@testing-library/react";

import { UserAttributeChart } from ".";
import { mockTeamData } from "./mockData";

describe("UserAttributeChart", () => {
  it("renders without throwing an error", () => {
    const { container } = render(<UserAttributeChart members={mockTeamData} />);

    expect(container).toBeInTheDocument();
  });
});

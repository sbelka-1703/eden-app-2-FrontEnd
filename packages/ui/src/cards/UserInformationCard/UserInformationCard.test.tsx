import { render } from "@testing-library/react";

import { UserInformationCard } from ".";

describe("UserInformationCard", () => {
  it("renders without throwing", () => {
    const { container } = render(<UserInformationCard />);

    expect(container).toBeInTheDocument();
  });
});

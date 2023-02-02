import { render } from "@testing-library/react";

import { UserExperienceCard } from ".";

describe("UserExperienceCard", () => {
  it("renders without throwing", () => {
    const { container } = render(<UserExperienceCard />);

    expect(container).toBeInTheDocument();
  });
});

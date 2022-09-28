import { render } from "@testing-library/react";

import { TopicCard } from "./";

describe("TopicCard", () => {
  it("renders without throwing", () => {
    const { container } = render(<TopicCard />);

    expect(container).toBeInTheDocument();
  });
});

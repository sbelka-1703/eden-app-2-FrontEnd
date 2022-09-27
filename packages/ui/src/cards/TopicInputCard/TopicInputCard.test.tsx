import { render } from "@testing-library/react";

import { TopicInputCard } from ".";

describe("TopicInputCard", () => {
  it("renders without throwing", () => {
    const { container } = render(<TopicInputCard />);

    expect(container).toBeInTheDocument();
  });
});

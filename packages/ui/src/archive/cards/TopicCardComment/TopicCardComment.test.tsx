import { render } from "@testing-library/react";

import { TopicCardComment } from ".";

describe("TopicCardComment", () => {
  it("renders without throwing", () => {
    const { container } = render(<TopicCardComment />);

    expect(container).toBeInTheDocument();
  });
});

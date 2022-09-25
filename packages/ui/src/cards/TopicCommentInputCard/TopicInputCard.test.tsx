import { render } from "@testing-library/react";

import { TopicCommentInputCard } from ".";

describe("TopicCommentInputCard", () => {
  it("renders without throwing", () => {
    const { container } = render(<TopicCommentInputCard />);

    expect(container).toBeInTheDocument();
  });
});

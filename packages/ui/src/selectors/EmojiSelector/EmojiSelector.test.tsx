import { render } from "@testing-library/react";

import { EmojiSelector } from ".";

describe("EmojiSelector", () => {
  it("renders without throwing", () => {
    const { container } = render(<EmojiSelector />);

    expect(container).toBeInTheDocument();
  });
});

import { render } from "@testing-library/react";

import { AvatarList } from "./AvatarList";

describe("AvatarList", () => {
  it("renders without throwing", () => {
    const { container } = render(<AvatarList avatars={[]} />);

    expect(container).toBeInTheDocument();
  });
});

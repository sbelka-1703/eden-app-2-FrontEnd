import { render } from "@testing-library/react";

import { CommonServerAvatarListTest } from "./CommonServerAvatarListTest";

describe("CommonServerAvatarListTest", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <CommonServerAvatarListTest
        serverID={["883478451850473483", "996558082098339953"]}
      />
    );

    expect(container).toBeInTheDocument();
  });
});

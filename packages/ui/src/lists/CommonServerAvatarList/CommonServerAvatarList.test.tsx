import { render } from "@testing-library/react";

import { CommonServerAvatarList } from "./CommonServerAvatarList";

describe("CommonServerAvatarList", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <CommonServerAvatarList
        serverID={["883478451850473483", "996558082098339953"]}
      />
    );

    expect(container).toBeInTheDocument();
  });
});

import { render } from "@testing-library/react";

import { CVUploadGPT } from ".";

describe("CVUploadGPT", () => {
  it("renders without throwing", () => {
    const { container } = render(<CVUploadGPT />);

    expect(container).toBeInTheDocument();
  });
});

import { render } from "@testing-library/react";

import { Modal } from "./";

describe("Modal", () => {
  it("renders without throwing", () => {
    const { container } = render(<Modal />);

    expect(container).toBeInTheDocument();
  });
});

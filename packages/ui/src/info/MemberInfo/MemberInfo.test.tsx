import { render } from "@testing-library/react";

import { MemberInfo } from "./MemberInfo";

describe("MemberInfo", () => {
  it("renders without throwing", () => {
    const { container } = render(<MemberInfo />);

    expect(container).toBeInTheDocument();
  });
});

import { getMember } from "@eden/package-mock";

import { render } from "../../../utils/jest-apollo";
import { NewProfileContainer } from ".";

describe("NewProfileContainer", () => {
  const member = getMember();

  it("renders without throwing", () => {
    const { container } = render(<NewProfileContainer user={member} />);

    expect(container).toBeInTheDocument();
  });
});

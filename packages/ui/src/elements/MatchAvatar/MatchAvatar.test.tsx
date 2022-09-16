import { faker } from "@faker-js/faker";
import { render } from "@testing-library/react";

import { MatchAvatar } from ".";

describe("MatchAvatar", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <MatchAvatar percentage="21" src={faker.internet.avatar()} />
    );

    expect(container).toBeInTheDocument();
  });
});

import { faker } from "@faker-js/faker";
import { render } from "@testing-library/react";

import { LevelAvatar } from ".";

describe("LevelAvatar", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <LevelAvatar level={3} src={faker.internet.avatar()} />
    );

    expect(container).toBeInTheDocument();
  });
});

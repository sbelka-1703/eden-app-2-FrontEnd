import { render } from "@testing-library/react";

import { Favorite } from ".";

describe("Favorite", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <Favorite
        favorite={false}
        updateFavoriteCallback={() => {
          console.log("update favorite");
        }}
      />
    );

    expect(container).toBeInTheDocument();
  });
});

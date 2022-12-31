import { getNodesTypeMockArray } from "@eden/package-mock";
import { faker } from "@faker-js/faker";
import { render } from "@testing-library/react";

import { NodeList } from "./NodeList";

describe("NodeList", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <NodeList
        nodes={getNodesTypeMockArray(
          faker.datatype.number({ min: 5, max: 14, precision: 1 })
        )}
        colorRGB={"215,215,255"}
      />
    );

    expect(container).toBeInTheDocument();
  });
});

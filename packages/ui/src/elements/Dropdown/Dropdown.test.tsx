import { render } from "@testing-library/react";

import { Dropdown } from "./";

const skills = [
  { _id: 1, name: "Skill 1" },
  { _id: 2, name: "Skill 2" },
  { _id: 3, name: "Skill 3" },
  { _id: 4, name: "Skill 4" },
];

describe("Dropdown", () => {
  it("renders without throwing", () => {
    const { container } = render(<Dropdown items={skills} />);

    expect(container).toBeInTheDocument();
  });
});

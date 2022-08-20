import { render } from "@testing-library/react";

import { CollectionOfUsers } from ".";

const Users = [
  {
    title: "Designer",
    name: "John Doe",
    avatar: "https://avatars0.githubusercontent.com/u/174825?s=460&v=4",
  },
];

describe("CollectionOfUsers", () => {
  it("renders without throwing", () => {
    const { container } = render(<CollectionOfUsers users={Users} />);

    expect(container).toBeInTheDocument();
  });
});

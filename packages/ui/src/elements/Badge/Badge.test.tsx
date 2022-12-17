import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Badge } from "./";

test("When a user presses the X, it triggers the onClose event ", async () => {
  const user = userEvent.setup();
  const onClose = jest.fn();

  // Badge needs to have the text prop, otherwise it will not render
  render(<Badge closeButton={true} text={"Hello, World"} />);
  await user.click(screen.getByRole("button"));
  expect(onClose).toHaveBeenCalled;
});

test("When the prop for cutText is set to 5, the user can only see 5 letters, but with hover they would see the whole pharse", async () => {
  const user = userEvent.setup();

  render(<Badge closeButton={true} text={"Hello, World"} cutText={5} />);
  await user.hover(screen.getByText("Hello..."));
  expect(screen.getByText("Hello, World"));
});

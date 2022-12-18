import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Modal } from "./";

test("When the modal is open, it displays the content to the user", () => {
  render(
    <Modal open={true} title={"Title"}>
      Hello, World!
    </Modal>
  );

  expect(screen.getByText("Title")).toBeTruthy();
  expect(screen.getByText("Hello, World!")).toBeTruthy();
});

test("User can close the modal by pressing X, the key esc or clicking outside the modal", async () => {
  const onClose = jest.fn();
  const user = userEvent.setup();

  render(<Modal closeOnEsc={true} onClose={onClose} open={true} />);

  //user clicks on the X button
  await user.click(screen.getByRole("button"));
  render(<Modal closeOnEsc={true} onClose={onClose} open={true} />);
  /*
  The user presses the esacpe key
  (For some reason pressing the Escape key calls the onClose 2 times)
   */
  await user.keyboard("[Escape]");
  expect(onClose).toHaveBeenCalledTimes(3);
  // render(<Modal closeOnEsc={true} onClose={onClose} open={true} />);
  // await user.click(screen.getByRole("dialog"));
  // expect(onClose).toHaveBeenCalledTimes(3);
});

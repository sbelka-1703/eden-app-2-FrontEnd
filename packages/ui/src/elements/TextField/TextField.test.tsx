import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { TextField } from "./";

test("When a user is typing, it trigers an onChange event", async () => {
  const user = userEvent.setup();
  const onChange = jest.fn();

  render(<TextField onChange={onChange} />);
  const inputTextBox = screen.getByRole("textbox");

  await user.type(inputTextBox, "Hello, World");
  expect(onChange).toHaveBeenCalledTimes(12);
});

test.todo("When the TextField is disabled, the user cannot type in it");

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { TextField } from "./";

test("When a user is typing in an enabled TextFeild, it trigers an onChange event", async () => {
  const user = userEvent.setup();
  const onChange = jest.fn();

  const { rerender } = render(
    <TextField onChange={onChange} label={"label"} disabled={false} />
  );

  //Testing the label props
  expect(screen.getByText("label")).toBeInTheDocument();
  const inputTextBox = screen.getByRole("textbox");

  await user.type(inputTextBox, "Hello, World");
  //It takes 12 keystrokes to type "Hello, World"
  expect(onChange).toHaveBeenCalledTimes(12);

  rerender(<TextField onChange={onChange} disabled={true} />);

  await user.type(inputTextBox, "Hello, World");
  //If the the textField is disabled user should not trigger an onChange event
  expect(onChange).toHaveBeenCalledTimes(12);
});

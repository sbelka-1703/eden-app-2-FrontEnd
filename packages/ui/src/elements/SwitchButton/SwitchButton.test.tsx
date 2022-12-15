import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { SwitchButton } from ".";

test("When a user interacts with the SwitchButton an onChange event will be trigered", async () => {
  const onChange = jest.fn();
  const user = userEvent.setup();

  render(<SwitchButton onChange={onChange} label={"label"} />);
  expect(screen.getByText("label")).toBeInTheDocument();

  const button = screen.getByRole("checkbox");

  //user presses the SwitchButton twice and the onChange is triggered twice
  await user.dblClick(button);
  expect(onChange).toHaveBeenCalledTimes(2);
});

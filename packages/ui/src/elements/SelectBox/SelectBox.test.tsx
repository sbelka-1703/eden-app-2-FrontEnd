import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { SelectBox } from "..";

test("user can select from a list of options", async () => {
  const user = userEvent.setup();
  const onChange = jest.fn();

  render(
    <SelectBox
      caption="open"
      items={["one", "two", "three"]}
      onChange={onChange}
    />
  );

  const openButton = screen.getByRole("button", { name: "open" });

  // click the button to open it
  await user.click(openButton);

  // find all `option` elements
  const options = screen.getAllByRole("option");

  // validate the `options`
  expect(options).toHaveLength(3);

  expect(options[0]).toHaveValue(0);
  expect(options[0]).toHaveTextContent("one");

  expect(options[1]).toHaveValue(0);
  expect(options[1]).toHaveTextContent("two");

  expect(options[2]).toHaveValue(0);
  expect(options[2]).toHaveTextContent("three");

  // select "one" and validate that `onChange` is called with it
  await user.selectOptions(
    screen.getByRole("listbox"),
    screen.getByRole("option", { name: "one" })
  );
  expect(onChange).toHaveBeenLastCalledWith("one");

  // dropdown closes on select so re-open it
  await user.click(openButton);

  // select "two" and validate that `onChange` is called with it
  await user.selectOptions(
    screen.getByRole("listbox"),
    screen.getByRole("option", { name: "two" })
  );
  expect(onChange).toHaveBeenLastCalledWith("two");

  // dropdown closes on select so re-open it
  await user.click(openButton);

  // select "three" and validate that `onChange` is called with it
  await user.selectOptions(
    screen.getByRole("listbox"),
    screen.getByRole("option", { name: "three" })
  );
  expect(onChange).toHaveBeenLastCalledWith("three");
});

test("user can select multiple options if `multiple` mode is enabled", async () => {
  const user = userEvent.setup();
  const onChange = jest.fn();

  render(
    <SelectBox
      caption="open"
      items={["one", "two", "three"]}
      onChange={onChange}
      multiple
    />
  );

  // open the dropdown
  await user.click(screen.getByRole("button", { name: "open" }));

  // select "one" and "two"
  await user.selectOptions(screen.getByRole("listbox"), [
    screen.getByRole("option", { name: "one" }),
    screen.getByRole("option", { name: "two" }),
  ]);

  // validate that `onChange` was called with both values
  expect(onChange).toHaveBeenCalledWith(["one", "two"]);
});

test("user interaction can be prevented with the `disabled` prop", async () => {
  const user = userEvent.setup();
  const onChange = jest.fn();

  render(
    <SelectBox
      caption="open"
      items={["one", "two", "three"]}
      onChange={onChange}
      disabled
    />
  );

  // open the dropdown
  await user.click(screen.getByRole("button", { name: "open" }));

  // expect the `listbox` to not have appeared
  expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
});

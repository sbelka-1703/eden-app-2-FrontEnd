import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ProjectsMatchesModal } from ".";

window.IntersectionObserver = jest.fn().mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
});

test("openModal controls whether modal is rendered", () => {
  const { rerender } = render(<ProjectsMatchesModal openModal={false} />);

  expect(screen.queryByRole("dialog")).toBeNull();

  rerender(<ProjectsMatchesModal openModal />);

  expect(screen.getByRole("dialog")).toBeInTheDocument();
});

test("dynamic text content is placed in the correct containers", () => {
  render(
    <ProjectsMatchesModal
      openModal
      header1="Header1"
      header2="Header2"
      matchType="matchType"
      topLeftText="topLeftText"
      bottomLeftText="bottomLeftText"
      numMatchesBefore={10}
      topRightText="topRightText"
      bottomRightText="bottomRightText"
      numMatchesAfter={20}
    />
  );

  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
    "Header1"
  );
  expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
    "Header2"
  );

  const left = within(screen.getAllByRole("list")[1]);

  {
    const listitems = left.getAllByRole("listitem");

    expect(listitems[0]).toHaveTextContent("topLeftText");
    expect(listitems[1]).toHaveTextContent("10matchType");
    expect(listitems[2]).toHaveTextContent("bottomLeftText");
  }

  const right = within(screen.getAllByRole("list")[2]);

  {
    const listitems = right.getAllByRole("listitem");

    expect(listitems[0]).toHaveTextContent("topRightText");
    expect(listitems[1]).toHaveTextContent("20matchType");
    expect(listitems[2]).toHaveTextContent("bottomRightText");
  }
});

test("next button calls onSubmit callback", async () => {
  const user = userEvent.setup();

  const onSubmit = jest.fn();

  render(<ProjectsMatchesModal openModal onSubmit={onSubmit} />);

  await user.click(screen.getByRole("button", { name: "Next" }));

  expect(onSubmit).toHaveBeenCalled();
});

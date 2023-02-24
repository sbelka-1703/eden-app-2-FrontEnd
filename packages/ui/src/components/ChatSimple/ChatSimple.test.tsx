import { render } from "@testing-library/react";

import { ChatSimple } from ".";

const chatN: any = [
  {
    user: "01",
    message: "Can be verified on any platform using docker",
  },
  {
    user: "01",
    message: "Can be verified on any platform using docker",
  },
  {
    user: "01",
    message: "Can be verified on any platform using docker",
  },
  {
    user: "02",
    message:
      "Your error message says permission denied, npm global installs must be given root privileges.",
  },
  {
    user: "01",
    message: "Command was run with root privileges",
  },
  {
    user: "01",
    message: "update the descrip",
  },
  {
    user: "02",
    message:
      "Any updates on this issue? I'm getting the same error when trying to install devtools. Thanks",
  },
  {
    user: "01",
    message:
      "Thanks for your message David. I thought I'm alone with this issue. Please, ? the issue to support it :)",
  },
  {
    user: "02",
    message: "Are you using sudo?",
  },
  {
    user: "01",
    message:
      "It seems like you are from Mac OS world. There is no /Users/ folder on linux ?",
  },
  {
    user: "01",
    message:
      "It seems like you are from Mac OS world. There is no /Users/ folder on linux ?",
  },
];

describe("ChatSimple", () => {
  it("renders without throwing", () => {
    const { container } = render(<ChatSimple chatN={chatN} />);

    expect(container).toBeInTheDocument();
  });
});

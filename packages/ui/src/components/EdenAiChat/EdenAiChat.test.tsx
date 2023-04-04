import { render } from "@testing-library/react";

import { AI_REPLY_SERVICES, EdenAiChat } from ".";

describe("EdenAiChat", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <EdenAiChat aiReplyService={AI_REPLY_SERVICES.EDEN_GPT_REPLY} />
    );

    expect(container).toBeInTheDocument();
  });
});

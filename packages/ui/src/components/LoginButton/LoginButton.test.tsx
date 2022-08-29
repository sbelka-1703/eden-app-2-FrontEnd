import { render } from "@testing-library/react";
import { SessionProvider } from "next-auth/react";

import { LoginButton } from ".";

describe("LoginButton", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <SessionProvider
        session={{
          expires: "1",
          user: { id: "1", email: "a", name: "Miral", image: "c" },
        }}
      >
        <LoginButton />
      </SessionProvider>
    );

    expect(container).toBeInTheDocument();
  });
});

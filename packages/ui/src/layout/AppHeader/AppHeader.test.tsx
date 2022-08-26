import { render } from "@testing-library/react";
import { SessionProvider } from "next-auth/react";

import { AppHeader } from "./";

describe("AppHeader", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <SessionProvider
        session={{
          expires: "1",
          user: { email: "a", name: "Miral", image: "c" },
        }}
      >
        <AppHeader />
      </SessionProvider>
    );

    expect(container).toBeInTheDocument();
  });
});

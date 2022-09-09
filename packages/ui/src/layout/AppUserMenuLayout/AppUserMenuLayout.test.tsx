// import { render } from "@testing-library/react";
import { SessionProvider } from "next-auth/react";

import { render } from "../../../utils/jext-apollo";
import { AppUserMenuLayout } from "./";

describe("AppUserMenuLayout", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <SessionProvider
        session={{
          expires: "1",
          user: { id: "1", email: "a", name: "Miral", image: "c" },
        }}
      >
        <AppUserMenuLayout>children here</AppUserMenuLayout>
      </SessionProvider>
    );

    expect(container).toBeInTheDocument();
  });
});

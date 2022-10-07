// import { render } from "@testing-library/react";
import { SessionProvider } from "next-auth/react";

import { render } from "../../../utils/jest-apollo";
import { AppUserSubmenuLayout } from "./";

describe("AppUserSubmenuLayout", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <SessionProvider
        session={{
          expires: "1",
          user: { id: "1", email: "a", name: "Miral", image: "c" },
        }}
      >
        <AppUserSubmenuLayout>children here</AppUserSubmenuLayout>
      </SessionProvider>
    );

    expect(container).toBeInTheDocument();
  });
});

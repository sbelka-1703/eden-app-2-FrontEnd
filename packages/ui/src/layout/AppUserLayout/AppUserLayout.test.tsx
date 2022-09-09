// import { render } from "@testing-library/react";
import { SessionProvider } from "next-auth/react";

import { render } from "../../../utils/jext-apollo";
import { AppUserLayout } from "./";

describe("AppUserLayout", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <SessionProvider
        session={{
          expires: "1",
          user: { id: "1", email: "a", name: "Miral", image: "c" },
        }}
      >
        <AppUserLayout>children here</AppUserLayout>
      </SessionProvider>
    );

    expect(container).toBeInTheDocument();
  });
});

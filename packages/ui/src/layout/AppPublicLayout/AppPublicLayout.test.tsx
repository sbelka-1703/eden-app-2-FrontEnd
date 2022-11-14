// import { render } from "@testing-library/react";
import { SessionProvider } from "next-auth/react";

import { render } from "../../../utils/jest-apollo";
import { AppPublicLayout } from "./";
jest.mock("next/router", () => require("next-router-mock"));

describe("AppPublicLayout", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <SessionProvider
        session={{
          expires: "1",
          user: { id: "1", email: "a", name: "Miral", image: "c" },
        }}
      >
        <AppPublicLayout>children here</AppPublicLayout>
      </SessionProvider>
    );

    expect(container).toBeInTheDocument();
  });
});

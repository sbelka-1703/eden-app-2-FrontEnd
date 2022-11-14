import { MockedProvider } from "@apollo/client/testing";
import { FIND_MEMBER } from "@eden/package-graphql";
import { render } from "@testing-library/react";
import { SessionProvider } from "next-auth/react";

import { AppHeader } from "./";
jest.mock("next/router", () => require("next-router-mock"));

const mocks = [
  {
    request: {
      query: FIND_MEMBER,
      variables: {
        _id: "1",
      },
    },
    result: {
      data: {
        findMember: {
          _id: "1",
          discordName: "Miral",
          emailAddress: "miralsuthar@gmail.com",
        },
      },
    },
  },
];

describe("AppHeader", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <SessionProvider
        session={{
          expires: "1",
          user: { id: "1", email: "a", name: "Miral", image: "c" },
        }}
      >
        <MockedProvider mocks={mocks}>
          <AppHeader />
        </MockedProvider>
      </SessionProvider>
    );

    expect(container).toBeInTheDocument();
  });
});

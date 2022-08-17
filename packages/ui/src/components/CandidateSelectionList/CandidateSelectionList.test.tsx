import { MockedProvider } from "@apollo/client/testing";
import { MATCH_MEMBERS_TO_SKILLS } from "@graphql/eden";
import { render } from "@testing-library/react";

import { CandidateSelectionList } from "./";

const mocks = [
  {
    request: {
      query: MATCH_MEMBERS_TO_SKILLS,
      variables: {
        variables: {
          fields: {
            skillsID: ["62f11ca03235560004a45a4f", "62f11ca13235560004a45a52"],
          },
        },
        context: { serviceName: "soilservice" },
      },
    },
    result: {
      data: {
        matchMembersToSkills: [
          {
            matchPercentage: 100,
            member: {
              _id: "62f11ca03235560004a45a4f",
              avatar:
                "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
              name: "John Doe",
              percentage: 100,
              endorsements: 0,
              skills: [
                {
                  _id: "62f11ca03235560004a45a4f",
                  name: "JavaScript",
                  __typename: "Skill",
                },
              ],
            },
            __typename: "MemberMatch",
          },
        ],
      },
    },
  },
];

describe("CandidateSelectionList", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <CandidateSelectionList />
      </MockedProvider>
    );

    expect(container).toBeInTheDocument();
  });
});

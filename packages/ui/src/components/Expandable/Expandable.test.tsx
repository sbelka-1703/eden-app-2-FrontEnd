import { MockedProvider } from "@apollo/client/testing";
import { FIND_SKILL_BY_CATEGORIES } from "@graphql/eden";
import { render } from "@testing-library/react";

import { Expandable } from ".";

const mocks = [
  {
    request: {
      query: FIND_SKILL_BY_CATEGORIES,
      variable: {
        fields: { _id: "12312413afdasd" },
      },
    },
    result: {
      data: {
        findSkillSubCategory: {
          skills: [
            {
              _id: "63098cf9b003e10004f9a9e1",
              name: "Python (Programming Language)",
            },
            {
              _id: "63098cfeb003e10004f9aa04",
              name: "Bash (Scripting Language)",
            },
          ],
        },
      },
    },
  },
];

describe("Expandable", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Expandable
          category="Web Developement"
          query="web"
          id="123123"
          selected="123123"
          allSkills={[
            {
              _id: "12312413afdasd",
              name: "React.js",
              subCategorySkill: [{ name: "Web Development" }],
            },
            {
              _id: "1asdasdasdassd",
              name: "Nexy.js",
              subCategorySkill: [{ name: "Web Development" }],
            },
          ]}
          isOpen={false}
        />
      </MockedProvider>
    );

    expect(container).toBeInTheDocument();
  });
});

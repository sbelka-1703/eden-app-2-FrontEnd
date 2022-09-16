import { faker } from "@faker-js/faker";
import { render } from "@testing-library/react";

import { MemberMatchCard } from ".";

const Member = {
  discordAvatar: faker.internet.avatar(),
  discordName: "Realbayc",
  discriminator: "3245",
  memberRole: {
    title: "ux designer",
  },
  links: [
    {
      name: "twitter",
      url: "www.twitter.com",
    },
    {
      name: "github",
      url: "www.github.com",
    },
  ],
  skills: [
    {
      skillInfo: {
        name: "Figma",
      },
    },
    {
      skillInfo: {
        name: "react",
      },
    },
    {
      skillInfo: {
        name: "Graphic Designer",
      },
    },
    {
      skillInfo: {
        name: "html",
      },
    },
  ],
};

describe("MemberMatchCard", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <MemberMatchCard
        member={Member}
        percentage="21"
        requiredSkills={[
          {
            skillInfo: {
              name: "html",
            },
          },
          {
            skillInfo: {
              name: "css",
            },
          },
          {
            skillInfo: {
              name: "js",
            },
          },
          {
            skillInfo: {
              name: "react",
            },
          },
        ]}
      />
    );

    expect(container).toBeInTheDocument();
  });
});

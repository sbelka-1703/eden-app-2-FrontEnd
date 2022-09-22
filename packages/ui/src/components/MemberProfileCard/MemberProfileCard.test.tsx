import { faker } from "@faker-js/faker";
import { render } from "@testing-library/react";

import { MemberProfileCard } from ".";

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

describe("MemberProfileCard", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <MemberProfileCard percentage="65" member={Member} />
    );

    expect(container).toBeInTheDocument();
  });
});

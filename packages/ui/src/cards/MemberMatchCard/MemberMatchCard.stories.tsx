import { faker } from "@faker-js/faker";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { MemberMatchCard } from "./MemberMatchCard";

export default {
  title: "Cards/MemberMatchCard",
  component: MemberMatchCard,
  argTypes: {},
} as ComponentMeta<typeof MemberMatchCard>;

const Template: ComponentStory<typeof MemberMatchCard> = (args) => (
  <MemberMatchCard {...args} />
);

export const Default = Template.bind({});
Default.args = {
  requiredSkills: [
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
        name: "js",
      },
    },
    {
      skillInfo: {
        name: "html",
      },
    },
    {
      skillInfo: {
        name: "Team Collaboration",
      },
    },
    {
      skillInfo: {
        name: "Graphics",
      },
    },
    {
      skillInfo: {
        name: "Graphic Designer",
      },
    },
    {
      skillInfo: {
        name: "Python",
      },
    },
    {
      skillInfo: {
        name: "Lang",
      },
    },
    {
      skillInfo: {
        name: "Nodejs",
      },
    },
    {
      skillInfo: {
        name: "Django",
      },
    },
  ],
  percentage: "81",
  member: {
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
  },
};

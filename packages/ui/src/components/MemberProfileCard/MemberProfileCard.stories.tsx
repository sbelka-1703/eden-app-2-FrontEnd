import { faker } from "@faker-js/faker";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { MemberProfileCard } from "./MemberProfileCard";

export default {
  title: "Components/MemberProfileCard",
  component: MemberProfileCard,
  argTypes: {},
} as ComponentMeta<typeof MemberProfileCard>;

const Template: ComponentStory<typeof MemberProfileCard> = (args) => (
  <MemberProfileCard {...args} />
);

export const Default = Template.bind({});
Default.args = {
  member: {
    discordName: "melonMusk",
    discordAvatar: faker.internet.avatar(),
    discriminator: "4354",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti s ociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. ",
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
    memberRole: {
      title: "3d designer",
    },
    skills: [
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
      {
        skillInfo: {
          name: "node",
        },
      },
    ],
    hoursPerWeek: 20,
  },
};

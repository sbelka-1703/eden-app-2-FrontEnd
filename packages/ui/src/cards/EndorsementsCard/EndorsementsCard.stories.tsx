import { faker } from "@faker-js/faker";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { EndorsementsCard } from "./EndorsementsCard";

export default {
  title: "Cards/EndorsementsCard",
  component: EndorsementsCard,
  argTypes: {},
} as ComponentMeta<typeof EndorsementsCard>;

const Template: ComponentStory<typeof EndorsementsCard> = (args) => (
  <EndorsementsCard {...args} />
);

export const Default = Template.bind({});
const endorsements = [
  {
    name: "leadership",
    endorsedBy: [
      {
        src: faker.internet.avatar(),
        size: "md",
        alt: "avatar",
      },
      {
        src: faker.internet.avatar(),
        size: "md",
        alt: "avatar",
      },
      {
        src: faker.internet.avatar(),
        size: "md",
        alt: "avatar",
      },
      { src: faker.internet.avatar(), size: "md", alt: "avatar" },
    ],
  },
  {
    name: "FullStack",
    endorsedBy: [
      {
        src: faker.internet.avatar(),
        size: "md",
        alt: "avatar",
      },
      {
        src: faker.internet.avatar(),
        size: "md",
        alt: "avatar",
      },
      {
        src: faker.internet.avatar(),
        size: "md",
        alt: "avatar",
      },
      { src: faker.internet.avatar(), size: "md", alt: "avatar" },
    ],
  },
  {
    name: "Solidity",
    endorsedBy: [
      {
        src: faker.internet.avatar(),
        size: "md",
        alt: "avatar",
      },
      {
        src: faker.internet.avatar(),
        size: "md",
        alt: "avatar",
      },
      {
        src: faker.internet.avatar(),
        size: "md",
        alt: "avatar",
      },
      { src: faker.internet.avatar(), size: "md", alt: "avatar" },
    ],
  },
  {
    name: "collaboration",
    endorsedBy: [
      {
        src: faker.internet.avatar(),
        size: "md",
        alt: "avatar",
      },
      {
        src: faker.internet.avatar(),
        size: "md",
        alt: "avatar",
      },
      {
        src: faker.internet.avatar(),
        size: "md",
        alt: "avatar",
      },
      { src: faker.internet.avatar(), size: "md", alt: "avatar" },
    ],
  },
];
Default.args = {
  endorsements: endorsements,
  shadow: true,
};

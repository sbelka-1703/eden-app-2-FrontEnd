import { faker } from "@faker-js/faker";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { AvatarList } from "./AvatarList";

export default {
  title: "Components/AvatarList",
  component: AvatarList,
  argTypes: {},
} as ComponentMeta<typeof AvatarList>;

const Template: ComponentStory<typeof AvatarList> = (args) => (
  <AvatarList {...args} />
);

export const Default = Template.bind({});

const avatars = [
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
];
Default.args = {
  avatars,
};

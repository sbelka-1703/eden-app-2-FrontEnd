import { faker } from "@faker-js/faker";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { LevelAvatar } from "./LevelAvatar";

export default {
  title: "Elements/LevelAvatar",
  component: LevelAvatar,
  argTypes: {},
} as ComponentMeta<typeof LevelAvatar>;

const Template: ComponentStory<typeof LevelAvatar> = (args) => (
  <LevelAvatar {...args} />
);

export const Default = Template.bind({});
Default.args = {
  src: faker.internet.avatar(),
  level: 3,
};

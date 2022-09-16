import { faker } from "@faker-js/faker";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { MatchAvatar } from "./MatchAvatar";

export default {
  title: "Elements/MatchAvatar",
  component: MatchAvatar,
  argTypes: {},
} as ComponentMeta<typeof MatchAvatar>;

const Template: ComponentStory<typeof MatchAvatar> = (args) => (
  <MatchAvatar {...args} />
);

export const Default = Template.bind({});
Default.args = {
  src: faker.internet.avatar(),
  percentage: "81",
};

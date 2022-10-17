import { ComponentMeta, ComponentStory } from "@storybook/react";

import { BadgeSelector } from "./BadgeSelector";

export default {
  title: "Selector/BadgeSelector",
  component: BadgeSelector,
  argTypes: {},
} as ComponentMeta<typeof BadgeSelector>;

const Template: ComponentStory<typeof BadgeSelector> = (args) => (
  <BadgeSelector {...args} />
);

export const Default = Template.bind({});
Default.args = {
  items: [],
};

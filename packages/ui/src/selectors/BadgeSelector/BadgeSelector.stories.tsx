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
  items: [
    {
      _id: "1",
      title: "Category 1",
    },
    {
      _id: "2",
      title: "Category 2",
    },
    {
      _id: "3",
      title: "Category 3",
    },
    {
      _id: "4",
      title: "Category 4",
    },
    {
      _id: "5",
      title: "Category 5",
    },
    {
      _id: "6",
      title: "Category 6",
    },
  ],
};

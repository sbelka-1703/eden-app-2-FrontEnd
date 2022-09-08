import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Date } from "./Date";

export default {
  title: "Elements/Date",
  component: Date,
  argTypes: {},
} as ComponentMeta<typeof Date>;

const Template: ComponentStory<typeof Date> = (args) => <Date {...args} />;

export const Default = Template.bind({});
Default.args = {
  type: "primary",
  dayOfMonth: 22,
  month: "AUG",
  year: 22,
};

import { ComponentMeta, ComponentStory } from "@storybook/react";

import { AppHeader } from "./AppHeader";

export default {
  title: "Layout/AppHeader",
  component: AppHeader,
  argTypes: {},
} as ComponentMeta<typeof AppHeader>;

const Template: ComponentStory<typeof AppHeader> = (args) => (
  <AppHeader {...args} />
);

export const Default = Template.bind({});
Default.args = {};

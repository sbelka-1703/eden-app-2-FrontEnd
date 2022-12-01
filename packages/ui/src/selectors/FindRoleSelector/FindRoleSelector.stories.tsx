// import { findRoleTemplates } from "@eden/package-mock";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { FindRoleSelector } from "./FindRoleSelector";

export default {
  title: "Selector/FindRoleSelector",
  component: FindRoleSelector,
  argTypes: {},
} as ComponentMeta<typeof FindRoleSelector>;

const Template: ComponentStory<typeof FindRoleSelector> = (args) => (
  <FindRoleSelector {...args} />
);

export const Default = Template.bind({});
Default.args = {
  // roles: findRoleTemplates,
};

import { findRoleTemplates } from "@eden/package-mock";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { RoleSelector } from "./RoleSelector";

export default {
  title: "Selector/RoleSelector",
  component: RoleSelector,
  argTypes: {},
} as ComponentMeta<typeof RoleSelector>;

const Template: ComponentStory<typeof RoleSelector> = (args) => (
  <RoleSelector {...args} />
);

export const Default = Template.bind({});
Default.args = {
  roles: findRoleTemplates,
};

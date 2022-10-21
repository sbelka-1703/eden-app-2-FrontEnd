import { getRoleTypeMock } from "@eden/package-mock";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { RoleList } from "./RoleList";

const RoleArray = (total: number) =>
  Array.from({ length: total }, () => getRoleTypeMock());

export default {
  title: "Lists/RoleList",
  component: RoleList,
  argTypes: {},
} as ComponentMeta<typeof RoleList>;

const Template: ComponentStory<typeof RoleList> = (args) => (
  <RoleList {...args} />
);

export const Default = Template.bind({});

Default.args = {
  roles: RoleArray(9),
};

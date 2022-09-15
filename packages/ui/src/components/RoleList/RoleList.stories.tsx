import { ComponentMeta, ComponentStory } from "@storybook/react";

import { RoleList } from "./RoleList";

export default {
  title: "Components/RoleList",
  component: RoleList,
  argTypes: {},
} as ComponentMeta<typeof RoleList>;

const Template: ComponentStory<typeof RoleList> = (args) => (
  <RoleList {...args} />
);

export const Default = Template.bind({});

Default.args = {
  roles: [
    {
      title: "Role1",
    },
    {
      title: "Role1",
    },
    {
      title: "Role1",
    },
    {
      title: "Role1",
    },
    {
      title: "Role1",
    },
    {
      title: "Role1",
    },
  ],
};

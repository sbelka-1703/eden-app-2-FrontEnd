import { getRoleTypeMock } from "@eden/package-mock";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { RoleCard } from "./RoleCard";

export default {
  title: "Cards/RoleCard",
  component: RoleCard,
  argTypes: {},
} as ComponentMeta<typeof RoleCard>;

const Template: ComponentStory<typeof RoleCard> = (args) => (
  <RoleCard {...args} />
);

export const Default = Template.bind({});
Default.args = {
  role: getRoleTypeMock(),
  percentage: 89,
};

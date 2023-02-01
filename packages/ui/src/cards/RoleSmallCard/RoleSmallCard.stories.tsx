import { getRoleTypeMock } from "@eden/package-mock";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { RoleSmallCard } from "./RoleSmallCard";

export default {
  title: "Cards/RoleSmallCard",
  component: RoleSmallCard,
  argTypes: {},
} as ComponentMeta<typeof RoleSmallCard>;

const Template: ComponentStory<typeof RoleSmallCard> = (args) => (
  <RoleSmallCard {...args} />
);

export const Default = Template.bind({});
Default.args = {
  role: getRoleTypeMock(),
  isSelected: true,
};

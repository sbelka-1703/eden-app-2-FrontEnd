import { findRoleTemplates } from "@eden/package-mock";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { SignUpRoleSelectCard } from "./SignUpRoleSelectCard";

export default {
  title: "Archive/Cards/SignUpRoleSelectCard",
  component: SignUpRoleSelectCard,
  argTypes: {},
} as ComponentMeta<typeof SignUpRoleSelectCard>;

const Template: ComponentStory<typeof SignUpRoleSelectCard> = (args) => (
  <SignUpRoleSelectCard {...args} />
);

export const Default = Template.bind({});
Default.args = {
  roles: findRoleTemplates,
};

import { ComponentMeta, ComponentStory } from "@storybook/react";

import { UserProfileMenu } from "./UserProfileMenu";

export default {
  title: "Archive/Components/UserProfileMenu",
  component: UserProfileMenu,
  argTypes: {},
} as ComponentMeta<typeof UserProfileMenu>;

const Template: ComponentStory<typeof UserProfileMenu> = (args) => (
  <UserProfileMenu {...args} />
);

export const Default = Template.bind({});
Default.args = {
  title: "Good Morning,",
};

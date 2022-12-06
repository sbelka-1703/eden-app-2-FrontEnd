import { ComponentMeta, ComponentStory } from "@storybook/react";

import { ProfileContainer } from "./ProfileContainer";

export default {
  title: "Archive/Containers/ProfileContainer",
  component: ProfileContainer,
  argTypes: {},
} as ComponentMeta<typeof ProfileContainer>;

const Template: ComponentStory<typeof ProfileContainer> = (args) => (
  <ProfileContainer {...args} />
);

export const Default = Template.bind({});
Default.args = {};

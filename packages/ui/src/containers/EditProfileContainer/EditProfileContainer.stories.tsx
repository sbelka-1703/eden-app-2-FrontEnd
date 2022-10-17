import { ComponentMeta, ComponentStory } from "@storybook/react";

import { EditProfileContainer } from "./EditProfileContainer";

export default {
  title: "Containers/EditProfileContainer",
  component: EditProfileContainer,
  argTypes: {},
} as ComponentMeta<typeof EditProfileContainer>;

const Template: ComponentStory<typeof EditProfileContainer> = (args) => (
  <EditProfileContainer {...args} />
);

export const Default = Template.bind({});
Default.args = {};

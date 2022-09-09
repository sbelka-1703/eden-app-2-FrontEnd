import { ComponentMeta, ComponentStory } from "@storybook/react";
import { CurrentUserDecorator } from "storybook/.storybook/decorator";

import { ProfileContainer } from "./ProfileContainer";

export default {
  title: "Containers/ProfileContainer",
  component: ProfileContainer,
  argTypes: {},
  decorators: [CurrentUserDecorator],
} as ComponentMeta<typeof ProfileContainer>;

const Template: ComponentStory<typeof ProfileContainer> = (args) => (
  <ProfileContainer {...args} />
);

export const Default = Template.bind({});
Default.args = {};

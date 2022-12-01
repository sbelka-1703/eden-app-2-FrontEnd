import { ComponentMeta, ComponentStory } from "@storybook/react";

import { ViewUserProfileContainer } from "./ViewUserProfileContainer";

export default {
  title: "Containers/ViewUserProfileContainer",
  component: ViewUserProfileContainer,
  argTypes: {},
} as ComponentMeta<typeof ViewUserProfileContainer>;

const Template: ComponentStory<typeof ViewUserProfileContainer> = (args) => (
  <ViewUserProfileContainer {...args} />
);

export const Default = Template.bind({});
Default.args = {};

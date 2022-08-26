import { ComponentMeta, ComponentStory } from "@storybook/react";

import { LaunchContainer } from "./LaunchContainer";

export default {
  title: "Containers/LaunchContainer",
  component: LaunchContainer,
  argTypes: {},
} as ComponentMeta<typeof LaunchContainer>;

const Template: ComponentStory<typeof LaunchContainer> = (args) => (
  <LaunchContainer {...args} />
);

export const Default = Template.bind({});
Default.args = {};

import { ComponentMeta, ComponentStory } from "@storybook/react";

import { LaunchProjectContainer } from "./LaunchProjectContainer";

export default {
  title: "Containers/LaunchProjectContainer",
  component: LaunchProjectContainer,
  argTypes: {},
} as ComponentMeta<typeof LaunchProjectContainer>;

const Template: ComponentStory<typeof LaunchProjectContainer> = (args) => (
  <LaunchProjectContainer {...args} />
);

export const Default = Template.bind({});
Default.args = {};

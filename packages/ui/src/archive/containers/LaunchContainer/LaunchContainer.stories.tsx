import { LaunchProvider } from "./context";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { LaunchContainer } from "./LaunchContainer";

export default {
  title: "Archive/Containers/LaunchContainer",
  component: LaunchContainer,
  argTypes: {},
} as ComponentMeta<typeof LaunchContainer>;

const Template: ComponentStory<typeof LaunchContainer> = (args) => (
  <LaunchProvider>
    <LaunchContainer {...args} />
  </LaunchProvider>
);

export const Default = Template.bind({});
Default.args = {};

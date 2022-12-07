import { LaunchProjectProvider } from "@eden/package-context";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { ShortlistModalContainer } from "./ShortlistModalContainer";

export default {
  title: "Archive/Containers/ShortlistModalContainer",
  component: ShortlistModalContainer,
  argTypes: {},
} as ComponentMeta<typeof ShortlistModalContainer>;

const Template: ComponentStory<typeof ShortlistModalContainer> = (args) => (
  <LaunchProjectProvider>
    <ShortlistModalContainer {...args} />
  </LaunchProjectProvider>
);

export const Default = Template.bind({});
Default.args = {};

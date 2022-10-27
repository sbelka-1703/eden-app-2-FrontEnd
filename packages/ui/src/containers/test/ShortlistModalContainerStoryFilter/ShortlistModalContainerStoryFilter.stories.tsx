import { ComponentMeta, ComponentStory } from "@storybook/react";

import { ShortlistModalContainerStoryFilter } from "./ShortlistModalContainerStoryFilter";

export default {
  title: "Containers/ShortlistModalContainerStoryFilter",
  component: ShortlistModalContainerStoryFilter,
  argTypes: {},
} as ComponentMeta<typeof ShortlistModalContainerStoryFilter>;

const Template: ComponentStory<typeof ShortlistModalContainerStoryFilter> = (
  args
) => <ShortlistModalContainerStoryFilter {...args} />;

export const Default = Template.bind({});
Default.args = {};

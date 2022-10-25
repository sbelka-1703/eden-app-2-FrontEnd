import { ComponentMeta, ComponentStory } from "@storybook/react";

import { ShortlistModalContainerStory } from "./ShortlistModalContainerStory";

export default {
  title: "Containers/ShortlistModalContainerStory",
  component: ShortlistModalContainerStory,
  argTypes: {},
} as ComponentMeta<typeof ShortlistModalContainerStory>;

const Template: ComponentStory<typeof ShortlistModalContainerStory> = (
  args
) => <ShortlistModalContainerStory {...args} />;

export const Default = Template.bind({});
Default.args = {};

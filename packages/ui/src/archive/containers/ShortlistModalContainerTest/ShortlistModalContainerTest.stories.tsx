import { ComponentMeta, ComponentStory } from "@storybook/react";

import { ShortlistModalContainerTest } from "./ShortlistModalContainerTest";

export default {
  title: "Archive/Containers/ShortlistModalContainerTest",
  component: ShortlistModalContainerTest,
  argTypes: {},
} as ComponentMeta<typeof ShortlistModalContainerTest>;

const Template: ComponentStory<typeof ShortlistModalContainerTest> = (args) => (
  <ShortlistModalContainerTest {...args} />
);

export const Default = Template.bind({});
Default.args = {};

import { ComponentMeta, ComponentStory } from "@storybook/react";

import { EmojiSelector } from "./EmojiSelector";

export default {
  title: "Selector/EmojiSelector",
  component: EmojiSelector,
  argTypes: {},
} as ComponentMeta<typeof EmojiSelector>;

const Template: ComponentStory<typeof EmojiSelector> = (args) => (
  <EmojiSelector {...args} />
);

export const Default = Template.bind({});
Default.args = {
  bgColor: "#ffdce9",
  emoji: "👋",
};

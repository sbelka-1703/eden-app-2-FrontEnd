import { ComponentMeta, ComponentStory } from "@storybook/react";

import { CommonServerAvatarListTest } from "./CommonServerAvatarListTest";

export default {
  title: "Lists/CommonServerAvatarListTest",
  component: CommonServerAvatarListTest,
  argTypes: {},
} as ComponentMeta<typeof CommonServerAvatarListTest>;

const Template: ComponentStory<typeof CommonServerAvatarListTest> = (args) => (
  <CommonServerAvatarListTest {...args} />
);

export const Default = Template.bind({});

Default.args = {
  label: "Common Servers",
  size: "sm",
  serverID: ["883478451850473483", "996558082098339953"],
};

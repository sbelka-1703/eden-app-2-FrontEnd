import { ComponentMeta, ComponentStory } from "@storybook/react";

import { CommonServerAvatarList } from "./CommonServerAvatarList";

export default {
  title: "Lists/CommonServerAvatarList",
  component: CommonServerAvatarList,
  argTypes: {},
} as ComponentMeta<typeof CommonServerAvatarList>;

const Template: ComponentStory<typeof CommonServerAvatarList> = (args) => (
  <CommonServerAvatarList {...args} />
);

export const Default = Template.bind({});

Default.args = {
  label: "Common Servers",
  size: "sm",
  serverID: ["883478451850473483", "996558082098339953"],
};

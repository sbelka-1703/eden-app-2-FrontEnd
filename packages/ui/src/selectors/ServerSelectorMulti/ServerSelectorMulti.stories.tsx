import { ComponentMeta, ComponentStory } from "@storybook/react";

import { ServerSelectorMulti } from "./ServerSelectorMulti";

export default {
  title: "Selector/ServerSelectorMulti",
  component: ServerSelectorMulti,
  argTypes: {},
} as ComponentMeta<typeof ServerSelectorMulti>;

const Template: ComponentStory<typeof ServerSelectorMulti> = (args) => (
  <ServerSelectorMulti {...args} />
);

export const Default = Template.bind({});

Default.args = {
  value: ["996558082098339953"],
};

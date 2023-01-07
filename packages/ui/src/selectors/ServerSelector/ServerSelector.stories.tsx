import { ComponentMeta, ComponentStory } from "@storybook/react";

import { ServerSelector } from "./ServerSelector";

export default {
  title: "Selector/ServerSelector",
  component: ServerSelector,
  argTypes: {},
} as ComponentMeta<typeof ServerSelector>;

const Template: ComponentStory<typeof ServerSelector> = (args) => (
  <ServerSelector {...args} />
);

export const Default = Template.bind({});

Default.args = {
  value: "",
  onChangeString: (value) => console.log(value),
  onChangeServer: (value) => console.log(value),
  disabled: false,
};

export const Value = Template.bind({});
Value.args = {
  value: "996558082098339953",
  onChangeString: (value) => console.log(value),
  onChangeServer: (value) => console.log(value),
  disabled: false,
};

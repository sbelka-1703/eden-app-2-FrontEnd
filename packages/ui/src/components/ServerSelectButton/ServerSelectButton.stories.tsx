import { ComponentMeta, ComponentStory } from "@storybook/react";

import { ServerSelectButton } from "./ServerSelectButton";

export default {
  title: "Components/ServerSelectButton",
  component: ServerSelectButton,
  argTypes: {},
} as ComponentMeta<typeof ServerSelectButton>;

const Template: ComponentStory<typeof ServerSelectButton> = (args) => (
  <ServerSelectButton {...args} />
);

export const Default = Template.bind({});

Default.args = {};

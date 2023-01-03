import { ComponentMeta, ComponentStory } from "@storybook/react";

import { ServerFilter } from "./ServerFilter";

export default {
  title: "Components/ServerFilter",
  component: ServerFilter,
  argTypes: {},
} as ComponentMeta<typeof ServerFilter>;

const Template: ComponentStory<typeof ServerFilter> = (args) => (
  <ServerFilter {...args} />
);

export const Default = Template.bind({});

Default.args = {};

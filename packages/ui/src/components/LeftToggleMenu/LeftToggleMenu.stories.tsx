import { ComponentMeta, ComponentStory } from "@storybook/react";

import { LeftToggleMenu } from "./LeftToggleMenu";

export default {
  title: "Components/LeftToggleMenu",
  component: LeftToggleMenu,
  argTypes: {},
} as ComponentMeta<typeof LeftToggleMenu>;

const Template: ComponentStory<typeof LeftToggleMenu> = (args) => (
  <LeftToggleMenu {...args} />
);

export const Default = Template.bind({});
Default.args = {};

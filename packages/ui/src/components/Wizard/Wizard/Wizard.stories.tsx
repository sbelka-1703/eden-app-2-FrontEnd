import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Wizard } from "./Wizard";

export default {
  title: "Components/Wizard",
  component: Wizard,
  argTypes: {},
} as ComponentMeta<typeof Wizard>;

const Template: ComponentStory<typeof Wizard> = (args) => <Wizard {...args} />;

export const Default = Template.bind({});
Default.args = {};

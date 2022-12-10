import { ComponentMeta, ComponentStory } from "@storybook/react";

import { ToggleElement } from "./ToggleElement";

export default {
  title: "Elements/ToggleElement",
  component: ToggleElement,
  argTypes: {},
} as ComponentMeta<typeof ToggleElement>;

const Template: ComponentStory<typeof ToggleElement> = (args) => (
  <ToggleElement {...args} />
);

export const Default = Template.bind({});
Default.args = {
  isOptional: true,
  children: <p>Test</p>,
  title: "Lorem ipsum dolor sit?",
};

import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Missing404Section } from "./Missing404Section";

export default {
  title: "Sections/Missing404Section",
  component: Missing404Section,
  argTypes: {},
} as ComponentMeta<typeof Missing404Section>;

const Template: ComponentStory<typeof Missing404Section> = (args) => (
  <Missing404Section {...args} />
);

export const Default = Template.bind({});
Default.args = {};

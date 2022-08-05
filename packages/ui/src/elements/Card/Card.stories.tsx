import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Card } from "./Card";

export default {
  title: "Elements/Card",
  component: Card,
  argTypes: {},
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args) => <Card {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: "Card",
  shadow: true,
  border: false,
  background: false,
  focused: false,
};

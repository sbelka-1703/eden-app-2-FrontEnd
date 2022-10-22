import { ComponentMeta, ComponentStory } from "@storybook/react";

import { BatteryStepper } from "./BatteryStepper";

export default {
  title: "Steppers/BatteryStepper",
  component: BatteryStepper,
  argTypes: {},
} as ComponentMeta<typeof BatteryStepper>;

const Template: ComponentStory<typeof BatteryStepper> = (args) => (
  <BatteryStepper {...args} />
);

export const Default = Template.bind({});

Default.args = {
  batteryPercentage: 50,
};

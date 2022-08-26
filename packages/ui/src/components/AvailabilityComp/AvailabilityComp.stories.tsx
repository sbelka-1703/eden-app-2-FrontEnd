import { ComponentMeta, ComponentStory } from "@storybook/react";

import { AvailabilityComp } from "./AvailabilityComp";

export default {
  title: "Components/AvailabilityComp",
  component: AvailabilityComp,
  argTypes: {},
} as ComponentMeta<typeof AvailabilityComp>;

const Template: ComponentStory<typeof AvailabilityComp> = (args) => (
  <AvailabilityComp {...args} />
);

export const Default = Template.bind({});
Default.args = {
  timePerWeek: 10,
  seed: 1700
};

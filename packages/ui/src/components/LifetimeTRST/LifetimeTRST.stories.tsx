import { ComponentMeta, ComponentStory } from "@storybook/react";

import { LifetimeTRST } from "./LifetimeTRST";

export default {
  title: "Components/LifetimeTRST",
  component: LifetimeTRST,
  argTypes: {},
} as ComponentMeta<typeof LifetimeTRST>;

const Template: ComponentStory<typeof LifetimeTRST> = (args) => (
  <LifetimeTRST {...args} />
);

export const Default = Template.bind({});
Default.args = {
  lifetimeStakeTRST: 320,
  member: { name: "BluePanda" },
  averageMonthlyReturnTRST: 20,
};

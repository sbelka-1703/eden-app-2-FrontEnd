import { getRoleTypeMock } from "@eden/package-mock";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { OpenPositionCard } from "./OpenPositionCard";

export default {
  title: "Cards/OpenPositionCard",
  component: OpenPositionCard,
  argTypes: {},
} as ComponentMeta<typeof OpenPositionCard>;

const Template: ComponentStory<typeof OpenPositionCard> = (args) => {
  return <OpenPositionCard {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  role: getRoleTypeMock(),
  percentage: 89,
};

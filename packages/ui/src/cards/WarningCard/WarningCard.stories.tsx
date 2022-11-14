import { ComponentMeta, ComponentStory } from "@storybook/react";

import { WarningCard } from "./WarningCard";

export default {
  title: "Cards/WarningCard",
  component: WarningCard,
  argTypes: {},
} as ComponentMeta<typeof WarningCard>;

const Template: ComponentStory<typeof WarningCard> = (args) => (
  <WarningCard {...args} />
);

export const Default = Template.bind({});
Default.args = {
  profilePercentage: 35,
};

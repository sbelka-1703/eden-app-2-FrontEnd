import { ComponentMeta, ComponentStory } from "@storybook/react";

import { RoleCard } from "./RoleCard";

export default {
  title: "Cards/RoleCard",
  component: RoleCard,
  argTypes: {},
} as ComponentMeta<typeof RoleCard>;

const Template: ComponentStory<typeof RoleCard> = (args) => (
  <RoleCard {...args} />
);

export const Default = Template.bind({});
Default.args = {
  percentage: 89,
  jds: [
    "Minimum two years related experience",
    "Experience with Docker",
    "Familiarity with agile methodologies",
  ],
  openSeats: "02",
};

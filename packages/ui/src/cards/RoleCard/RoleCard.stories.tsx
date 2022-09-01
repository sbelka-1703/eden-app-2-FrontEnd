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
  roleTitle: "Backend Developer",
  percentage: 89,
  duration: "10 Weeks",
  jds: [
    "Minimum two years related experience",
    "Experience with Docker",
    "Familiarity with agile methodologies",
  ],
  openSeats: "02",
};

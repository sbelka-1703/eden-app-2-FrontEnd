import { matchNodesToMembersMock } from "@eden/package-mock";
// import { faker } from "@faker-js/faker";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { GrantsCard } from "./GrantsCard";

export default {
  title: "Cards/GrantsCard",
  component: GrantsCard,
  argTypes: {},
} as ComponentMeta<typeof GrantsCard>;

const Template: ComponentStory<typeof GrantsCard> = (args) => (
  <GrantsCard {...args} />
);

export const Default = Template.bind({});
Default.args = {
  matchMember: matchNodesToMembersMock(),
};

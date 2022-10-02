/* eslint-disable camelcase */
import { getMember } from "@eden/package-mock";
import { faker } from "@faker-js/faker";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { CandidateProfileCard } from "./CandidateProfileCard";

export default {
  title: "Cards/CandidateProfileCard",
  component: CandidateProfileCard,
  argTypes: {},
} as ComponentMeta<typeof CandidateProfileCard>;

const Template: ComponentStory<typeof CandidateProfileCard> = (args) => (
  <CandidateProfileCard {...args} />
);

export const Default = Template.bind({});
Default.args = {
  member: getMember(),
  percentage: Number(faker.random.numeric(2)),
};

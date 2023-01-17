import { getSkillRoleTypeMockArray } from "@eden/package-mock";
import { faker } from "@faker-js/faker";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { FiltersCard } from "./FiltersCard";

export default {
  title: "Archive/Cards/FiltersCard",
  component: FiltersCard,
  argTypes: {},
} as ComponentMeta<typeof FiltersCard>;

const Template: ComponentStory<typeof FiltersCard> = (args) => (
  <FiltersCard {...args} />
);

export const Default = Template.bind({});
Default.args = {
  skills: getSkillRoleTypeMockArray(
    faker.datatype.number({ min: 2, max: 15, precision: 1 })
  ),
};

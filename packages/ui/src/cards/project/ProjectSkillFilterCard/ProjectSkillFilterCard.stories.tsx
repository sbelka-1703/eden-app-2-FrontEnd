import { getSkillRoleTypeMockArray } from "@eden/package-mock";
import { faker } from "@faker-js/faker";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { ProjectSkillFilterCard } from "./ProjectSkillFilterCard";

export default {
  title: "Cards/Project/ProjectSkillFilterCard",
  component: ProjectSkillFilterCard,
  argTypes: {},
} as ComponentMeta<typeof ProjectSkillFilterCard>;

const Template: ComponentStory<typeof ProjectSkillFilterCard> = (args) => (
  <ProjectSkillFilterCard {...args} />
);

export const Default = Template.bind({});
Default.args = {
  skills: getSkillRoleTypeMockArray(
    faker.datatype.number({ min: 2, max: 15, precision: 1 })
  ),
  roles: [],
};

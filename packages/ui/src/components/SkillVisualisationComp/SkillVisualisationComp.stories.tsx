import { getSkillRoleTypeMockArray } from "@eden/package-mock";
import { faker } from "@faker-js/faker";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { SkillVisualisationComp } from "./SkillVisualisationComp";
export default {
  title: "Components/SkillVisualisationComp",
  component: SkillVisualisationComp,
  argTypes: {},
} as ComponentMeta<typeof SkillVisualisationComp>;

const Template: ComponentStory<typeof SkillVisualisationComp> = (args) => (
  <SkillVisualisationComp {...args} />
);

export const Default = Template.bind({});

Default.args = {
  skills: getSkillRoleTypeMockArray(
    faker.datatype.number({ min: 2, max: 15, precision: 1 })
  ),
};

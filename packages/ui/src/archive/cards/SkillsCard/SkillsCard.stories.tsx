import { faker } from "@faker-js/faker";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { SkillsCard } from "./SkillsCard";

export default {
  title: "Archive/Cards/SkillsCard",
  component: SkillsCard,
  argTypes: { onSelect: { action: "selected" } },
} as ComponentMeta<typeof SkillsCard>;

const Template: ComponentStory<typeof SkillsCard> = (args) => (
  <SkillsCard {...args} />
);

const getCandidates = () =>
  Array.from({ length: 12 }, () => {
    return {
      skillInfo: { name: faker.name.jobArea() },
    };
  });

export const Default = Template.bind({});
Default.args = {
  skills: getCandidates(),
  shadow: true,
  closeButton: false,
  className: "p-6",
};

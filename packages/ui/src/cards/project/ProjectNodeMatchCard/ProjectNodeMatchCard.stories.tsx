import { matchNodesToProjectRolesMock } from "@eden/package-mock";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { ProjectNodeMatchCard } from "./ProjectNodeMatchCard";

export default {
  title: "Cards/Project/ProjectNodeMatchCard",
  component: ProjectNodeMatchCard,
  argTypes: {},
} as ComponentMeta<typeof ProjectNodeMatchCard>;

const Template: ComponentStory<typeof ProjectNodeMatchCard> = (args) => (
  <ProjectNodeMatchCard {...args} />
);

export const Default = Template.bind({});
Default.args = {
  matchedProject: matchNodesToProjectRolesMock(),
};

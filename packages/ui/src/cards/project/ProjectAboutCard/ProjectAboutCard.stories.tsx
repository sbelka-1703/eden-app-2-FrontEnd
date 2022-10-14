import { getProject } from "@eden/package-mock";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { ProjectAboutCard } from "./ProjectAboutCard";

export default {
  title: "Cards/Project/ProjectAboutCard",
  component: ProjectAboutCard,
  argTypes: {},
} as ComponentMeta<typeof ProjectAboutCard>;

const Template: ComponentStory<typeof ProjectAboutCard> = (args) => (
  <ProjectAboutCard {...args} />
);

export const Default = Template.bind({});
Default.args = {
  project: getProject(),
};

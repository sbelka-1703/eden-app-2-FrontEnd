import { ComponentMeta, ComponentStory } from "@storybook/react";

import { ProjectCard } from "./ProjectCard";

export default {
  title: "Cards/ProjectCard",
  component: ProjectCard,
  argTypes: {},
} as ComponentMeta<typeof ProjectCard>;

const Template: ComponentStory<typeof ProjectCard> = (args) => (
  <ProjectCard {...args} />
);

export const Default = Template.bind({});
Default.args = {
  title: "Eden protocol",
  description: "Find & be found by opportunities accross the DAO",
  avatar:
    "https://cdn.discordapp.com/avatars/908392557258604544/3d834ac5b2ed60c37533ffe2c3c3a2a7.jpg",
  position: "Scrum Master",
  // percentage: 0,
  focused: false,
  favButton: true,
};

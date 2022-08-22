import { ComponentMeta, ComponentStory } from "@storybook/react";

import { ProjectCardSmall } from "./ProjectCardSmall";

export default {
  title: "Cards/ProjectCardSmall",
  component: ProjectCardSmall,
  argTypes: {},
} as ComponentMeta<typeof ProjectCardSmall>;

const Template: ComponentStory<typeof ProjectCardSmall> = (args) => (
  <ProjectCardSmall {...args} />
);

export const Default = Template.bind({});
Default.args = {
  title: "Eden protocol",
  description: "Find & be found by opportunities accross the DAO",
  avatar:
    "https://cdn.discordapp.com/avatars/908392557258604544/3d834ac5b2ed60c37533ffe2c3c3a2a7.jpg"
};

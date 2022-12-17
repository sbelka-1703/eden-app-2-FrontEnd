import { getProject } from "@eden/package-mock";
import { faker } from "@faker-js/faker";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { ProjectHeader } from "./ProjectHeader";

export default {
  title: "Components/ProjectHeader",
  component: ProjectHeader,
  argTypes: {},
} as ComponentMeta<typeof ProjectHeader>;

const Template: ComponentStory<typeof ProjectHeader> = (args) => (
  <ProjectHeader {...args} />
);

export const Default = Template.bind({});
Default.args = {
  project: getProject(),
  avatarSrc: faker.internet.avatar(),
  isFavoriteButton: true,
};

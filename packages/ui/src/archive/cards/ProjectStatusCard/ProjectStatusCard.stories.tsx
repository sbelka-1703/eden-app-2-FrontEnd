import { getProjectMemberTypeMock } from "@eden/package-mock";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { ProjectStatusCard } from "./ProjectStatusCard";

export default {
  title: "Archive/Cards/Project/ProjectStatusCard",
  component: ProjectStatusCard,
  argTypes: {},
} as ComponentMeta<typeof ProjectStatusCard>;

const Template: ComponentStory<typeof ProjectStatusCard> = (args) => (
  <ProjectStatusCard {...args} />
);

export const Default = Template.bind({});
Default.args = {
  project: getProjectMemberTypeMock(),
  roleName: "BackEnd Developer",
  appliedDateData: {
    type: "primary",
    dayOfMonth: 22,
    month: "AUG",
    year: 22,
  },
  kickoffDateData: {
    type: "secondary",
    dayOfMonth: 22,
    month: "AUG",
    year: 22,
  },
};

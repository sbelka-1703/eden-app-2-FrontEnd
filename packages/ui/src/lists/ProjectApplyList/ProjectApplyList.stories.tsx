import { ProjectMemberType } from "@eden/package-graphql/generated";
import { getProjectArray } from "@eden/package-mock";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { ProjectApplyList } from "./ProjectApplyList";

export default {
  title: "Lists/ProjectApplyList",
  component: ProjectApplyList,
  argTypes: {},
} as ComponentMeta<typeof ProjectApplyList>;

const Template: ComponentStory<typeof ProjectApplyList> = (args) => (
  <ProjectApplyList {...args} />
);

export const Default = Template.bind({});
Default.args = {
  projects: getProjectArray(9) as ProjectMemberType[],
};

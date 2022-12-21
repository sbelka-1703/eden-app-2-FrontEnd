import { matchNodesToProjectRolesMock } from "@eden/package-mock";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { ProjectNodeMatchInfo } from "./ProjectNodeMatchInfo";

export default {
  title: "Info/ProjectNodeMatchInfo",
  component: ProjectNodeMatchInfo,
  argTypes: {},
} as ComponentMeta<typeof ProjectNodeMatchInfo>;

const Template: ComponentStory<typeof ProjectNodeMatchInfo> = (args) => {
  return <ProjectNodeMatchInfo {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  matchedProject: matchNodesToProjectRolesMock(),
};

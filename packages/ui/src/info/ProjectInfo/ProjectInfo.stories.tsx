import { getProject } from "@eden/package-mock";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { useState } from "react";

import { ProjectInfo } from "./ProjectInfo";

export default {
  title: "Info/ProjectInfo",
  component: ProjectInfo,
  argTypes: {},
} as ComponentMeta<typeof ProjectInfo>;

const Template: ComponentStory<typeof ProjectInfo> = (args) => {
  const [experienceOpen, setExperienceOpen] = useState<number | null>(null);

  return (
    <ProjectInfo
      {...args}
      experienceOpen={experienceOpen}
      setExperienceOpen={setExperienceOpen}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  project: getProject(),
  percentage: 83,
};

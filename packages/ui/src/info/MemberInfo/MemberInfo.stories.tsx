import { getMember } from "@eden/package-mock";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { useState } from "react";

import { MemberInfo } from "./MemberInfo";

export default {
  title: "Info/MemberInfo",
  component: MemberInfo,
  argTypes: {},
} as ComponentMeta<typeof MemberInfo>;

const Template: ComponentStory<typeof MemberInfo> = (args) => {
  const [experienceOpen, setExperienceOpen] = useState<number | null>(null);

  return (
    <MemberInfo
      {...args}
      experienceOpen={experienceOpen}
      setExperienceOpen={setExperienceOpen}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  member: getMember(),
  percentage: 83,
};

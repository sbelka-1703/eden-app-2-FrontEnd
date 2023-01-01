import { getMember } from "@eden/package-mock";
import { STEPS } from "@eden/package-ui/utils";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { useState } from "react";

import { ViewUserProfileContainer } from "./ViewUserProfileContainer";

export default {
  title: "Containers/ViewUserProfileContainer",
  component: ViewUserProfileContainer,
  argTypes: {},
} as ComponentMeta<typeof ViewUserProfileContainer>;

const Template: ComponentStory<typeof ViewUserProfileContainer> = (args) => {
  const [experienceOpen, setExperienceOpen] = useState<number | null>(null);

  return (
    <ViewUserProfileContainer
      {...args}
      experienceOpen={experienceOpen}
      setExperienceOpen={setExperienceOpen}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  user: getMember(),
  step: STEPS.ROLE,
};

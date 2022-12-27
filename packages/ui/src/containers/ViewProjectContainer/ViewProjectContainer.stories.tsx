import { getProject } from "@eden/package-mock";
import { STEPS } from "@eden/package-ui/utils";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { useState } from "react";

import { ViewProjectContainer } from "./ViewProjectContainer";

export default {
  title: "Containers/ViewProjectContainer",
  component: ViewProjectContainer,
  argTypes: {},
} as ComponentMeta<typeof ViewProjectContainer>;

const Template: ComponentStory<typeof ViewProjectContainer> = (args) => {
  // const [step, setStep] = useState(STEPS.ROLE);
  const step = STEPS.ROLE;

  const [experienceOpen, setExperienceOpen] = useState<number | null>(null);

  return (
    <ViewProjectContainer
      {...args}
      experienceOpen={experienceOpen}
      setExperienceOpen={setExperienceOpen}
      step={step}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  project: getProject(),
};

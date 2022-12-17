import { getProject } from "@eden/package-mock";
import { ComponentMeta, ComponentStory } from "@storybook/react";

// import { useState } from "react";
import { OpenPositions } from "./OpenPositions";

export default {
  title: "Components/OpenPositions",
  component: OpenPositions,
  argTypes: {},
} as ComponentMeta<typeof OpenPositions>;

const Template: ComponentStory<typeof OpenPositions> = (args) => {
  //   const [experienceOpen, setExperienceOpen] = useState<number | null>(null);

  return (
    <OpenPositions
      {...args}
      //   experienceOpen={experienceOpen}
      //   setExperienceOpen={setExperienceOpen}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  project: getProject(),
  //   percentage: 83,
};

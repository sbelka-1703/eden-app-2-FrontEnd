import { Project } from "@eden/package-graphql/generated";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { useState } from "react";

import { CreateProjectContainer } from "./CreateProjectContainer";

enum PROJECT_STEPS {
  START = "START",
  DESCRIPTION = "DESCRIPTION",
  ADD_ROLE = "ADD_ROLE",
  ADD_ANOTHER_ROLE = "ADD_ANOTHER_ROLE",
}

export default {
  title: "Containers/CreateProjectContainer/CreateProjectContainer",
  component: CreateProjectContainer,
  argTypes: {},
} as ComponentMeta<typeof CreateProjectContainer>;

const Template: ComponentStory<typeof CreateProjectContainer> = (args) => {
  const [projectState, setProjectState] = useState<Project>();
  const [step, setStep] = useState(PROJECT_STEPS.START);
  const [view, setView] = useState<"grants" | "profile">("grants");

  console.log("view", view);

  return (
    <CreateProjectContainer
      {...args}
      step={step}
      setStep={setStep}
      state={projectState}
      setState={setProjectState}
      setView={setView}
    />
  );
};

export const Default = Template.bind({});
Default.args = {};

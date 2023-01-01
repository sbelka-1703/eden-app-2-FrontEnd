import { Members } from "@eden/package-graphql/generated";
import { STEPS } from "@eden/package-ui/utils";
import { getFillProfilePercentage } from "@eden/package-ui/utils/fill-profile-percentage";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { useState } from "react";

import { FillUserProfileContainer } from "./FillUserProfileContainer";

export default {
  title: "Containers/FillUserProfileContainer",
  component: FillUserProfileContainer,
  argTypes: {},
} as ComponentMeta<typeof FillUserProfileContainer>;

const Template: ComponentStory<typeof FillUserProfileContainer> = (args) => {
  const [userState, setUserState] = useState<Members>();
  const [step, setStep] = useState(STEPS.ROLE);
  const [view, setView] = useState<"grants" | "profile">("grants");

  console.log("view", view);
  return (
    <FillUserProfileContainer
      {...args}
      step={step}
      setStep={setStep}
      state={userState}
      setState={setUserState}
      setView={setView}
      percentage={getFillProfilePercentage(userState || {})}
    />
  );
};

export const Default = Template.bind({});
Default.args = {};

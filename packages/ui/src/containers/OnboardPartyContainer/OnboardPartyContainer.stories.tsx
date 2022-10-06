import { ComponentMeta, ComponentStory } from "@storybook/react";
import { getMember } from "@eden/package-mock";

import { OnboardPartyContainer } from "./OnboardPartyContainer";

export default {
  title: "Containers/OnboardPartyContainer",
  component: OnboardPartyContainer,
  argTypes: {},
} as ComponentMeta<typeof OnboardPartyContainer>;

const Template: ComponentStory<typeof OnboardPartyContainer> = (args) => (
  <OnboardPartyContainer {...args} />
);

export const Default = Template.bind({});
Default.args = {
  members: [getMember(), getMember()],
};

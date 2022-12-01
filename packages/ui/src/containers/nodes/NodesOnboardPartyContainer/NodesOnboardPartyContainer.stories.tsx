import { getMember } from "@eden/package-mock";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { NodesOnboardPartyContainer } from "./NodesOnboardPartyContainer";

export default {
  title: "Containers/Nodes/NodesOnboardPartyContainer",
  component: NodesOnboardPartyContainer,
  argTypes: {},
} as ComponentMeta<typeof NodesOnboardPartyContainer>;

const Template: ComponentStory<typeof NodesOnboardPartyContainer> = (args) => (
  <NodesOnboardPartyContainer {...args} />
);

export const Default = Template.bind({});
Default.args = {
  members: [getMember(), getMember()],
};

import { ComponentMeta, ComponentStory } from "@storybook/react";

import { DiscoverTalent } from "./DiscoverTalent";

export default {
  title: "Components/DiscoverTalent",
  component: DiscoverTalent,
  argTypes: {},
} as ComponentMeta<typeof DiscoverTalent>;

const Template: ComponentStory<typeof DiscoverTalent> = (args) => (
  <DiscoverTalent {...args} />
);

export const Default = Template.bind({});
Default.args = {
  openModal: true,
  nodeType: "expertise",
  title: `Your role`,
  matchType: "People",
  batteryPercentage: 50,
  onPrev: () => {
    console.log("prev");
  },
  onNext: (data) => {
    console.log(data);
  },
};

import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Prioritize } from "./Prioritize";

export default {
  title: "Components/Prioritize",
  component: Prioritize,
  argTypes: {},
} as ComponentMeta<typeof Prioritize>;

const Template: ComponentStory<typeof Prioritize> = (args) => (
  <Prioritize {...args} />
);

export const Default = Template.bind({});
Default.args = {
  numMatches: 29,
  battery: false,
  batteryPercentage: 75,
  openModal: true,
  onPrev: () => {},
  onNext: (data) => {
    console.log(data);
  },
};

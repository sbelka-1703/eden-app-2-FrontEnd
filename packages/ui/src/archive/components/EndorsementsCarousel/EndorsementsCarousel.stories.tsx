import { getMemberArray } from "@eden/package-mock";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { EndorsementsCarousel } from "./EndorsementsCarousel";

export default {
  title: "Archive/Components/EndorsmentsCarousel",
  component: EndorsementsCarousel,
  argTypes: {},
} as ComponentMeta<typeof EndorsementsCarousel>;

const Template: ComponentStory<typeof EndorsementsCarousel> = (args) => {
  return <EndorsementsCarousel {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  members: getMemberArray(10),
};

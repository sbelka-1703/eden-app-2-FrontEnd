import { getEndorsementsTypeMockArray } from "@eden/package-mock";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { EndorsementList } from "./EndorsementList";

export default {
  title: "Lists/EndorsementList",
  component: EndorsementList,
  argTypes: {},
} as ComponentMeta<typeof EndorsementList>;

const Template: ComponentStory<typeof EndorsementList> = (args) => (
  <EndorsementList {...args} />
);

export const Default = Template.bind({});

Default.args = {
  endorsements: getEndorsementsTypeMockArray(8),
};

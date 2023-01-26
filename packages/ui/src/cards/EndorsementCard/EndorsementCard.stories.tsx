import { getEndorsementsTypeMock } from "@eden/package-mock";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { EndorsementCard } from "./EndorsementCard";

export default {
  title: "Cards/EndorsementCard",
  component: EndorsementCard,
  argTypes: {},
} as ComponentMeta<typeof EndorsementCard>;

const Template: ComponentStory<typeof EndorsementCard> = (args) => (
  <EndorsementCard {...args} />
);

export const Default = Template.bind({});

Default.args = {
  endoresement: getEndorsementsTypeMock(),
  level: 3,
};

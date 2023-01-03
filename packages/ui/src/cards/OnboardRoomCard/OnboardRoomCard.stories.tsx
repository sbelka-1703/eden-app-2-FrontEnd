import { getRoomTypeMock } from "@eden/package-mock";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { OnboardRoomCard } from "./OnboardRoomCard";

export default {
  title: "Cards/OnboardRoomCard",
  component: OnboardRoomCard,
  argTypes: {},
} as ComponentMeta<typeof OnboardRoomCard>;

const Template: ComponentStory<typeof OnboardRoomCard> = (args) => {
  return <OnboardRoomCard {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  room: getRoomTypeMock(),
};

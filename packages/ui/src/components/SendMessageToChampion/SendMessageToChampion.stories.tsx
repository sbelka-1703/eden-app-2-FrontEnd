import { getMember } from "@eden/package-mock";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { CurrentUserDecorator } from "storybook/.storybook/decorator";

import { SendMessageToChampion } from "./SendMessageToChampion";

export default {
  title: "Components/SendMessageToChampion",
  component: SendMessageToChampion,
  argTypes: {},
  decorators: [CurrentUserDecorator],
} as ComponentMeta<typeof SendMessageToChampion>;

const Template: ComponentStory<typeof SendMessageToChampion> = (args) => {
  return <SendMessageToChampion {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  member: getMember(),
};

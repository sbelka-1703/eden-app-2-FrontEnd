import { ComponentMeta, ComponentStory } from "@storybook/react";
import { CurrentUserDecorator } from "storybook/.storybook/decorator";

import { EditProfileOnboardPartyNodesCard } from "./EditProfileOnboardPartyNodesCard";

export default {
  title: "Cards/EditProfileOnboardPartyNodesCard",
  component: EditProfileOnboardPartyNodesCard,
  argTypes: {},
  decorators: [CurrentUserDecorator],
} as ComponentMeta<typeof EditProfileOnboardPartyNodesCard>;

const Template: ComponentStory<typeof EditProfileOnboardPartyNodesCard> = (
  args
) => <EditProfileOnboardPartyNodesCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  RoomID: "60f1b1f1b1b1b1b1b1b1b1b1",
  serverID: "60f1b1f1b1b1b1b1b1b1b1b1",
  // handleUpdateUser: function (): void {
  //   //
  // },
};

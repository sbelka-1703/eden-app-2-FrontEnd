import { ComponentMeta, ComponentStory } from "@storybook/react";

import { EditProfileOnboardPartyNodesCard } from "./EditProfileOnboardPartyNodesCard";

export default {
  title: "Cards/EditProfileOnboardPartyNodesCard",
  component: EditProfileOnboardPartyNodesCard,
  argTypes: {},
} as ComponentMeta<typeof EditProfileOnboardPartyNodesCard>;

const Template: ComponentStory<typeof EditProfileOnboardPartyNodesCard> = (
  args
) => <EditProfileOnboardPartyNodesCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  handleUpdateUser: function (): void {
    //
  },
};

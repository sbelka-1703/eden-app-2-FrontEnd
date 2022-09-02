import { ComponentMeta, ComponentStory } from "@storybook/react";

import { EditProfileOnboardPartyCard } from "./EditProfileOnboardPartyCard";

export default {
  title: "Cards/EditProfileOnboardPartyCard",
  component: EditProfileOnboardPartyCard,
  argTypes: {},
} as ComponentMeta<typeof EditProfileOnboardPartyCard>;

const Template: ComponentStory<typeof EditProfileOnboardPartyCard> = (args) => (
  <EditProfileOnboardPartyCard {...args} />
);

export const Default = Template.bind({});
Default.args = {
  currentUser: {
    _id: "123412342134",
    discordAvatar: undefined,
    discordName: undefined,
    skills: undefined,
  },
  skills: [],
  handleSetSkills: function (): void {
    //
  },
};

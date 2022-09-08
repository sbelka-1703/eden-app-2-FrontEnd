import { ComponentMeta, ComponentStory } from "@storybook/react";
import { getMember } from "storybook/mocks";

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
  currentUser: getMember(),
  handleSetSkills: function (): void {
    //
  },
  handleUpdateUser: function (): void {
    //
  },
};

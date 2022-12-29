import { ComponentMeta, ComponentStory } from "@storybook/react";

import { ShortlistMemberModal } from "./ShortlistMemberModal";

export default {
  title: "Archive/Modals/ShortlistMemberModal",
  component: ShortlistMemberModal,
  argTypes: {},
} as ComponentMeta<typeof ShortlistMemberModal>;

const Template: ComponentStory<typeof ShortlistMemberModal> = (args) => (
  <ShortlistMemberModal {...args} />
);

export const Default = Template.bind({});
Default.args = {
  isModalOpen: true,
  members: [
    {
      memberInfo: {
        _id: "1",
        discordName: "eloi",
        discriminator: "4567",
      },
      roleID: "10",
    },
    {
      memberInfo: {
        _id: "2",
        discordName: "miral",
        discriminator: "1234",
      },
      roleID: "11",
    },
    {
      memberInfo: {
        _id: "3",
        discordName: "blue",
        discriminator: "4578",
      },
      roleID: "10",
    },
    {
      memberInfo: {
        _id: "4",
        discordName: "moiz",
        discriminator: "9012",
        memberRole: {
          title: "Designer",
        },
      },

      roleID: "12",
    },
  ],
  roles: [
    {
      _id: "10",
      title: "Designer",
    },
    {
      _id: "11",
      title: "Frontend",
    },
    {
      _id: "12",
      title: "Backend",
    },
  ],
};

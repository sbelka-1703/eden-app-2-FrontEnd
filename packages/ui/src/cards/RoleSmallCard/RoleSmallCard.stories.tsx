import { ComponentMeta, ComponentStory } from "@storybook/react";

import { RoleSmallCard } from "./RoleSmallCard";

export default {
  title: "Cards/RoleSmallCard",
  component: RoleSmallCard,
  argTypes: {},
} as ComponentMeta<typeof RoleSmallCard>;

const Template: ComponentStory<typeof RoleSmallCard> = (args) => (
  <RoleSmallCard {...args} />
);

export const Default = Template.bind({});
Default.args = {
  role: {
    title: "FrontEnd",
  },
  isSelected: true,
  skills: [
    {
      skillData: {
        _id: "1",
        name: "skill1",
      },
    },
    {
      skillData: {
        _id: "2",
        name: "skill2",
      },
    },
    {
      skillData: {
        _id: "3",
        name: "skill3",
      },
    },
    {
      skillData: {
        _id: "4",
        name: "skill4",
      },
    },
    {
      skillData: {
        _id: "5",
        name: "skill5",
      },
    },
    {
      skillData: {
        _id: "6",
        name: "skill6",
      },
    },
    {
      skillData: {
        _id: "7",
        name: "skill7",
      },
    },
  ],
};

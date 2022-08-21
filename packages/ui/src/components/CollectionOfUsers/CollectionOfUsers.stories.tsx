import { ComponentMeta, ComponentStory } from "@storybook/react";

import { CollectionOfUsers, IUsersData } from "./CollectionOfUsers";

export default {
  title: "Components/CollectionOfUsers",
  component: CollectionOfUsers,  
  argTypes: {},
} as ComponentMeta<typeof CollectionOfUsers>;

const Template: ComponentStory<typeof CollectionOfUsers> = (args) => (
  <CollectionOfUsers {...args} />
);

const Users = [
  {
    person: "soon 10xDev",
    username: "@geniusyinka",
  },
  {
    person: "MENTORSHIP CHAMPION",
    username: "@blue",
  },
  {
    person: "Budget Steward",
    username: "@tom",
  },

  {
    person: "Eden team",
    username: "@wyse",
  },
  {
    person: "Loki",
    username: "@loki",
  },

  {
    person: "Tony Stark",
    username: "@iron-man",
  },
];

export const Default = Template.bind({});
Default.args = {
  // Users,
};

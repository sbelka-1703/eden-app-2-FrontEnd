import { faker } from "@faker-js/faker";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { UserProfileMenu } from "./UserProfileMenu";

export default {
  title: "Components/UserProfileMenu",
  component: UserProfileMenu,
  argTypes: {},
} as ComponentMeta<typeof UserProfileMenu>;

const Template: ComponentStory<typeof UserProfileMenu> = (args) => (
  <UserProfileMenu {...args} />
);

export const Default = Template.bind({});
Default.args = {
  currentUser: {
    discordName: faker.internet.userName(),
    discordAvatar: faker.internet.avatar(),
  },
  title: faker.name.fullName(),
};

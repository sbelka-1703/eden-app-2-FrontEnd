// import { faker } from "@faker-js/faker";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { CurrentUserDecorator } from "storybook/.storybook/decorator";

import { UserProfileCard } from "./UserProfileCard";

export default {
  title: "Cards/UserProfileCard",
  component: UserProfileCard,
  argTypes: {},
  decorators: [CurrentUserDecorator],
} as ComponentMeta<typeof UserProfileCard>;

const Template: ComponentStory<typeof UserProfileCard> = (args) => (
  <UserProfileCard {...args} />
);

export const Default = Template.bind({});
Default.args = {
  role: "Scrum Master",
};

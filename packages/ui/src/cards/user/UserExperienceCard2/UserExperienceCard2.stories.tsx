import { ComponentMeta, ComponentStory } from "@storybook/react";

import { UserExperienceCard2 } from "./UserExperienceCard2";

export default {
  title: "Cards/User/UserExperienceCard2",
  component: UserExperienceCard2,
  argTypes: {},
} as ComponentMeta<typeof UserExperienceCard2>;

const Template: ComponentStory<typeof UserExperienceCard2> = (args) => (
  <UserExperienceCard2 {...args} />
);

export const Default = Template.bind({});
Default.args = {};

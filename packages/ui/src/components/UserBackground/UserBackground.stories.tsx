// import { faker } from "@faker-js/faker";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { UserBackground } from "./UserBackground";

export default {
  title: "Components/UserBackground",
  component: UserBackground,
  argTypes: {},
} as ComponentMeta<typeof UserBackground>;

const Template: ComponentStory<typeof UserBackground> = (args) => (
  <UserBackground {...args} />
);

export const Default = Template.bind({});
Default.args = {
  background: undefined,
  initialEndorsements: [],
  experienceOpen: null,
  // eslint-disable-next-line no-unused-vars
  setExperienceOpen: function (val: any): void {
    throw new Error("Function not implemented.");
  },
};

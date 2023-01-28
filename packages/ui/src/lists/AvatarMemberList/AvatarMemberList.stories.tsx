import { getMemberLiteArray } from "@eden/package-mock";
import { faker } from "@faker-js/faker";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { AvatarMemberList } from "./AvatarMemberList";

export default {
  title: "Lists/AvatarMemberList",
  component: AvatarMemberList,
  argTypes: {},
} as ComponentMeta<typeof AvatarMemberList>;

const Template: ComponentStory<typeof AvatarMemberList> = (args) => (
  <AvatarMemberList {...args} />
);

export const Default = Template.bind({});

Default.args = {
  members: getMemberLiteArray(
    faker.datatype.number({ min: 2, max: 6, precision: 1 })
  ),
  size: `md`,
};

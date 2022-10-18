import { getMember } from "@eden/package-mock";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Endorsements } from "./Endorsements";

export default {
  title: "Archive/Components/Endorsements",
  component: Endorsements,
  argTypes: {},
} as ComponentMeta<typeof Endorsements>;

const Template: ComponentStory<typeof Endorsements> = (args) => (
  <Endorsements {...args} />
);

export const Default = Template.bind({});
Default.args = {
  member: getMember(),
  endorsement: "Blockchain",
};

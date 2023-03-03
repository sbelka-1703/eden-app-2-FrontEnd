import { ComponentMeta, ComponentStory } from "@storybook/react";

import { DynamicSearchMemberGraph } from "./DynamicSearchMemberGraph";

export default {
  title: "Components/DynamicSearchMemberGraph",
  component: DynamicSearchMemberGraph,
  argTypes: {},
} as ComponentMeta<typeof DynamicSearchMemberGraph>;

const Template: ComponentStory<typeof DynamicSearchMemberGraph> = (args) => {
  return <DynamicSearchMemberGraph {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  nodesID: [""],
  memberID: "908392557258604544",
};

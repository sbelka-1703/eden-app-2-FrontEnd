import { ComponentMeta, ComponentStory } from "@storybook/react";

import { DynamicSearchMemberGraphs } from "./DynamicSearchMemberGraphs";

export default {
  title: "Components/DynamicSearchMemberGraphs",
  component: DynamicSearchMemberGraphs,
  argTypes: {},
} as ComponentMeta<typeof DynamicSearchMemberGraphs>;

const Template: ComponentStory<typeof DynamicSearchMemberGraphs> = (args) => {
  return <DynamicSearchMemberGraphs {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  nodesID: [""],
  memberID: "908392557258604544",
};

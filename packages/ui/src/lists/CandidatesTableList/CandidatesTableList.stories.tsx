import { ComponentMeta, ComponentStory } from "@storybook/react";

import { CandidatesTableList } from "./CandidatesTableList";
import { candidatesListExample } from "./constants";

export default {
  title: "Lists/CandidatesTableList",
  component: CandidatesTableList,
  argTypes: {},
} as ComponentMeta<typeof CandidatesTableList>;

const Template: ComponentStory<typeof CandidatesTableList> = (args) => (
  <CandidatesTableList {...args} />
);

export const Default = Template.bind({});

Default.args = {
  candidatesList: candidatesListExample,
};

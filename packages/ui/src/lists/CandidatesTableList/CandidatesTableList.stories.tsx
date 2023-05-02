import { ComponentMeta, ComponentStory } from "@storybook/react";

import { CandidatesTableList } from "./CandidatesTableList";
import { candidatesListFormatted } from "./constants";

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
  candidatesList: candidatesListFormatted,
  fetchIsLoading: false,
};

export const Loading = Template.bind({});
Loading.args = {
  candidatesList: [],
  fetchIsLoading: true,
};

export const NoResults = Template.bind({});
NoResults.args = {
  candidatesList: [],
  fetchIsLoading: false,
};

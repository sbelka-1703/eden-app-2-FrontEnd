import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Question, TrainQuestionsEdenAI } from "./TrainQuestionsEdenAI";

export default {
  title: "Components/TrainQuestionsEdenAI",
  component: TrainQuestionsEdenAI,
  argTypes: {},
} as ComponentMeta<typeof TrainQuestionsEdenAI>;

const Template: ComponentStory<typeof TrainQuestionsEdenAI> = (args) => {
  return <TrainQuestionsEdenAI {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  questions: [],
  companyID: "",
  setQuestions: (questions: Question[]) => console.log(questions),
  setTrainModalOpen: (open: boolean) => console.log(open),
};

import { ComponentMeta, ComponentStory } from "@storybook/react";

import { AI_INTERVIEW_SERVICES, InterviewEdenAI } from "./InterviewEdenAI";

export default {
  title: "Components/InterviewEdenAI",
  component: InterviewEdenAI,
  argTypes: {},
} as ComponentMeta<typeof InterviewEdenAI>;

const Template: ComponentStory<typeof InterviewEdenAI> = (args) => (
  <InterviewEdenAI {...args} />
);

export const Default = Template.bind({});
Default.args = { aiReplyService: AI_INTERVIEW_SERVICES.EDEN_GPT_REPLY };

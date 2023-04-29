import { ComponentMeta, ComponentStory } from "@storybook/react";

import { AI_REPLY_SERVICES, EdenAiChat } from "./EdenAiChat";

export default {
  title: "Components/EdenAiChat",
  component: EdenAiChat,
  argTypes: {},
} as ComponentMeta<typeof EdenAiChat>;

const Template: ComponentStory<typeof EdenAiChat> = (args) => (
  <EdenAiChat {...args} />
);

export const Default = Template.bind({});
Default.args = { aiReplyService: AI_REPLY_SERVICES.EDEN_GPT_REPLY };

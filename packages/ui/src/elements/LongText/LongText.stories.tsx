import { ComponentMeta, ComponentStory } from "@storybook/react";

import { LongText } from "./LongText";

export default {
  title: "Elements/LongText",
  component: LongText,
  argTypes: {},
} as ComponentMeta<typeof LongText>;

const Template: ComponentStory<typeof LongText> = (args) => (
  <LongText {...args} />
);

export const Default = Template.bind({});
Default.args = {
  text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat possimus molestias id repudiandae, beatae sed qui nisi soluta quisquam suscipit, molestiae sequi laboriosam rem itaque sint impedit. Magni maxime voluptatum quia maiores ex adipisci harum sapiente saepe laborum quis libero eveniet iure velit esse nihil deserunt quisquam nesciunt, quas laboriosam! Culpa ea fuga in odio repellat assumenda illo iusto animi distinctio veritatis nisi, quia modi minus provident. Debitis, ducimus quas?",
};

import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Endorsments } from "./Endorsments";

export default {
    title: "Components/Endorsments",
    component: Endorsments,
    argTypes: {},
} as ComponentMeta<typeof Endorsments>;

const Template: ComponentStory<typeof Endorsments> = (args) => (
    <Endorsments {...args} />
)

export const Default = Template.bind({});
Default.args = {};
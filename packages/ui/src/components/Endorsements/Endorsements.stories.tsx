import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Endorsements } from "./Endorsements";

export default {
    title: "Components/Endorsements",
    component: Endorsements,
    argTypes: {},
} as ComponentMeta<typeof Endorsements>;

const Template: ComponentStory<typeof Endorsements> = (args) => (
    <Endorsements {...args} />
)

export const Default = Template.bind({});
Default.args = {};
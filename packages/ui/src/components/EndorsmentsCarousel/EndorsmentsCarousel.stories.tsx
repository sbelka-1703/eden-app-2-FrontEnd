import { ComponentMeta, ComponentStory } from "@storybook/react";

import { EndorsmentsCarousel } from "./EndorsmentsCarousel";

export default {
    title: "Components/EndorsmentsCarousel",
    component: EndorsmentsCarousel,
    argTypes: {},
} as ComponentMeta<typeof EndorsmentsCarousel>;

const Template: ComponentStory<typeof EndorsmentsCarousel> = (args) => (
    <EndorsmentsCarousel {...args} />
);


export const Default = Template.bind({});
Default.args = {
};
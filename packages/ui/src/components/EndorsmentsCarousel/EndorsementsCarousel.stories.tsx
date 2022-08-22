import { ComponentMeta, ComponentStory } from "@storybook/react";

import { EndorsementsCarousel } from "./EndorsmentsCarousel";

export default {
    title: "Components/EndorsmentsCarousel",
    component: EndorsementsCarousel,
    argTypes: {},
} as ComponentMeta<typeof EndorsementsCarousel>;

const Template: ComponentStory<typeof EndorsementsCarousel> = (args) => (
    <EndorsementsCarousel {...args} />
);


export const Default = Template.bind({});
Default.args = {
};
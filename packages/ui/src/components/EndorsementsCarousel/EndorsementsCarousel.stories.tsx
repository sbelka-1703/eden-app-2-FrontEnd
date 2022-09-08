import { ComponentMeta, ComponentStory } from "@storybook/react";
import { faker } from "@faker-js/faker";
import { EndorsementsCarousel } from "./EndorsementsCarousel";
import { useState } from "react";

export default {
  title: "Components/EndorsmentsCarousel",
  component: EndorsementsCarousel,
  argTypes: {},
} as ComponentMeta<typeof EndorsementsCarousel>;

const Template: ComponentStory<typeof EndorsementsCarousel> = (args) => {
  return <EndorsementsCarousel  {...args} />
};


const getEndorsements = () =>
  Array.from({ length: 10 }, (_, i) => {
    return {
      id: Math.random(),
      name: faker.name.firstName(),
      avatarSrc: faker.internet.avatar(),
    };
  });

  const list = getEndorsements()


export const Default = Template.bind({});
Default.args = {
  endorsementList: list,
  // onClaim: (id:number) => console.log(list.filter((l) => l.id !== id))
  
};

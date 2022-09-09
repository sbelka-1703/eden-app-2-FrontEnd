import {ComponentMeta, ComponentStory} from "@storybook/react";
import { ProjectChampion } from "./ProjectChampion";
import { Avatar } from "../../elements";
import { faker } from "@faker-js/faker";


export default {
  title: "Components/ProjectChampion",
  component: ProjectChampion,
  argTypes: {},
} as ComponentMeta<typeof ProjectChampion>;

const Template: ComponentStory<typeof ProjectChampion> = (args) => {
  return <ProjectChampion {...args} />
};

export const Default = Template.bind({});
Default.args = {
  avatarSrc: faker.internet.avatar()
};
import { faker } from "@faker-js/faker";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { getProject } from "storybook/mocks";
import { getMember } from "storybook/mocks";
import { ProjectAboutCard } from "./ProjectAboutCard";

export default {
  title: "Cards/Project/ProjectAboutCard",
  component: ProjectAboutCard,
  argTypes: {},
} as ComponentMeta<typeof ProjectAboutCard>;

const Template: ComponentStory<typeof ProjectAboutCard> = (args) => (
  <ProjectAboutCard {...args} />
);

export const Default = Template.bind({});
Default.args = {
  title: "Soil 🌱 Talent",
  subTitle: "Coordination App",
  projectOneLiner: "Find and be found for opportunity",
  projectMember: getMember(),
  emoji: "🌱",
  projectDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed varius massa et malesuada venenatis. Pellentesque blandit enim in aliquam porttitor. Suspendisse risus risus, tempor eu tristique eget, scelerisque quis ex. Donec semper auctor sapien sed tempor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aenean non rutrum diam. Nullam turpis leo, dictum vitae accumsan in, viverra semper dolor. In tincidunt tortor eget felis tempus, eu pretium metus placerat. Ut tempor suscipit vulputate. Nulla vulputate massa",
};

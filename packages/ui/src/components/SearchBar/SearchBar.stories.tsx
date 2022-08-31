import { ComponentMeta, ComponentStory } from "@storybook/react";
import { useState } from "react";

import { SearchBar } from "./SearchBar";

export default {
  title: "Components/SearchBar",
  component: SearchBar,
  argTypes: {},
} as ComponentMeta<typeof SearchBar>;

const Template: ComponentStory<typeof SearchBar> = (args) => {
  const [skills, setSkills] = useState([]);

  return <SearchBar {...args} skills={skills} setSkills={setSkills} />;
};

const allSkills = [
  { id: 1, name: "Reactjs", category: "Frontend" },
  { id: 2, name: "Nextjs", category: "Frontend" },
  { id: 3, name: "Node", category: "Backend" },
  { id: 4, name: "Express", category: "Backend" },
];

export const Default = Template.bind({});
Default.args = {
  allSkills: allSkills,
};

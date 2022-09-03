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

export const Default = Template.bind({});

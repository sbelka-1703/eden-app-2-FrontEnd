import { ComponentMeta, ComponentStory } from "@storybook/react";
import { useState } from "react";

import { SkillSelector } from "./SkillSelector";

export default {
  title: "components/SkillSelector",
  component: SkillSelector,
  argTypes: {},
} as ComponentMeta<typeof SkillSelector>;

const Template: ComponentStory<typeof SkillSelector> = (args) => {
  const [idSelected, setIdSelected] = useState<string | null>(null);

  return (
    <SkillSelector
      {...args}
      selected={idSelected}
      setSelected={setIdSelected}
    />
  );
};

export const Default = Template.bind({});

Default.args = {
  skills: [],
  item: {
    _id: "q12w3e4r",
    name: "React.js",
  },
  levels: [
    {
      title: "learning",
      level: "learning",
    },
    {
      title: "mid",
      level: "mid",
    },
  ],
};

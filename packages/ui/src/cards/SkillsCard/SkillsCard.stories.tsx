import { ComponentMeta, ComponentStory } from "@storybook/react";

import { SkillsCard } from './SkillsCard';

export default {
    title: "Cards/SkillsCard",
    component: SkillsCard,
    argTypes: {},
  } as ComponentMeta<typeof SkillsCard>;

  const Template: ComponentStory<typeof SkillsCard> = (args) => (
    <SkillsCard {...args} />
  );
  
  export const Default = Template.bind({});
  Default.args = {
      skills: [
          {text: 'Design', colorRGB: '38, 138, 2', onClick: () => console.log("")},
          {text: 'Figma', colorRGB: '214, 92, 158', onClick: () => console.log("")},
          {text: 'FrontEnd', colorRGB: '101, 125, 248', onClick: () => console.log("")},
          {text: 'Art', colorRGB: '236, 240, 71', onClick: () => console.log("")},
          {text: 'Design', colorRGB: '38, 138, 2', onClick: () => console.log("")},
          {text: 'Figma', colorRGB: '214, 92, 158', onClick: () => console.log("")},
          {text: 'FrontEnd', colorRGB: '101, 125, 248', onClick: () => console.log("")},
          {text: 'Art', colorRGB: '236, 240, 71', onClick: () => console.log("")},
          {text: 'Design', colorRGB: '38, 138, 2', onClick: () => console.log("")},
          {text: 'Figma', colorRGB: '214, 92, 158', onClick: () => console.log("")},
          {text: 'FrontEnd', colorRGB: '101, 125, 248', onClick: () => console.log("")},
          {text: 'Art', colorRGB: '236, 240, 71', onClick: () => console.log("")},
      ]
  };
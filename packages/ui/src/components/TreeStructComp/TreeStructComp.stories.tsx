import { ComponentMeta, ComponentStory } from "@storybook/react";

import { TreeStructComp } from "./TreeStructComp";
export default {
  title: "Components/TreeStructComp",
  component: TreeStructComp,
  argTypes: {},
} as ComponentMeta<typeof TreeStructComp>;

const Template: ComponentStory<typeof TreeStructComp> = (args) => (
  <TreeStructComp {...args} />
);

export const Default = Template.bind({});

Default.args = {
  color: { top: "#00FFFF", middle: "#DEDCFC", bottom: "#FAE5F8" },
  tree: {
    node: {
      name: "DESIGN",
      _id: "asdfasf2efwf2ef",
      star: false,
      open: true,
    },
    middle: [
      {
        node: {
          name: "UX/UI",
          _id: "asdfasf2efwf2ef",
          star: true,
          open: true,
        },
        bottom: [
          {
            name: "Figma",
            _id: "asdfasf2efwf2ef",
            star: true,
          },
          {
            name: "prototyping",
            _id: "asdfasf2efwf2ef",
            star: false,
          },
          {
            name: "User Research",
            _id: "asdfasf2efwf2ef",
            star: false,
          },
          {
            name: "Branding",
            _id: "asdfasf2efwf2ef",
            star: true,
          },
        ],
      },
      {
        node: {
          name: "Web Design",
          _id: "asdfasf2efwf2ef",
          star: false,
          open: true,
        },
        bottom: [
          {
            name: "Figma",
            _id: "asdfasf2efwf2ef",
            star: true,
          },
          {
            name: "prototyping",
            _id: "asdfasf2efwf2ef",
            star: false,
          },
          {
            name: "User Research",
            _id: "asdfasf2efwf2ef",
            star: false,
          },
          {
            name: "Branding",
            _id: "asdfasf2efwf2ef",
            star: true,
          },
        ],
      },
      {
        node: {
          name: "Game Design",
          _id: "asdfasf2efwf2ef",
          star: false,
          open: false,
        },
        bottom: [],
      },
    ],
  },
};

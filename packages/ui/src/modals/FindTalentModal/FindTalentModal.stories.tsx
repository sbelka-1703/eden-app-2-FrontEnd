import { ComponentMeta, ComponentStory } from "@storybook/react";

import { FindTalentModal } from "./FindTalentModal";

export default {
  title: "Modals/FindTalentModal",
  component: FindTalentModal,
  argTypes: {},
} as ComponentMeta<typeof FindTalentModal>;

const Template: ComponentStory<typeof FindTalentModal> = (args) => (
  <FindTalentModal {...args} />
);

const MOCK_DATA = [
  {
    _id: "1",
    title: "Vibe check - what values should they possess?",
    subtitle:
      "Do you have carefullly curated culture in your team? Tell us what values are important for you!",
    itemsTitle: "Values & Culture fit:",
    battery: true,
    items: [
      {
        _id: "1",
        name: "Ownership",
      },
      {
        _id: "2",
        name: "Passion",
      },
      {
        _id: "3",
        name: "Teamwork",
      },
      {
        _id: "4",
        name: "Honesty",
      },
      {
        _id: "5",
        name: "Integrity",
      },
    ],
  },
  {
    _id: "2",
    title: "What skills are a must have? AI is getting better!  👉🏽",
    subtitle: "More specific you are - better matches you’ll get!",
    itemsTitle: "Required skills:",
    battery: true,
    items: [
      {
        _id: "11",
        name: "Art",
      },
      {
        _id: "12",
        name: "GIMP",
      },
      {
        _id: "13",
        name: "3D",
      },
      {
        _id: "14",
        name: "Qualitative",
      },
      {
        _id: "15",
        name: "Research",
      },
    ],
  },
  {
    _id: "3",
    title: "Vibe check - what values should they possess?",
    subtitle:
      "Do you have carefullly curated culture in your team? Tell us what values are important for you!",
    itemsTitle: "Values & Culture fit:",
    battery: true,
    items: [
      {
        _id: "6",
        name: "Diversity",
      },
      {
        _id: "7",
        name: "Inculsivity",
      },
      {
        _id: "8",
        name: "Reliability",
      },
      {
        _id: "9",
        name: "Reliability",
      },
      {
        _id: "10",
        name: "Fun",
      },
    ],
  },
];

export const Default = Template.bind({});
Default.args = {
  data: MOCK_DATA,
  openModal: true,
  onClose: () => null,
  onSubmit: (data) => {
    console.log(data);
  },
};

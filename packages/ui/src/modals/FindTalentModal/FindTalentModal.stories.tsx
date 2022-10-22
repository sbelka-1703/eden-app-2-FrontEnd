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

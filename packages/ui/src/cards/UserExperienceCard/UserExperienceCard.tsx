import { Card, Dropdown, TextField } from "../../elements";
import { useState } from "react";
import { TextArea } from "../../elements/TextAreaComponent";
import { Calendar } from "../../components/CalendarComp";
export interface UserExperienceCardlProps {
  // avatar?: string;
  // title?: string;
  // description?: string;
  // onUpdateFavorite?: () => void;
  // onMoreInfoClick?: () => void;
}

export const UserExperienceCard = ({}: UserExperienceCardlProps) => {
  const [title, setTitle] = useState("");
  return (
    <Card shadow className="p-0">
      <div className="px-[170px] py-10 mx-auto">
        <p className="text-3xl">Share relevant experiences!</p>
      </div>
      <div className="flex space-x-6">
        <div>
          <TextField onChange={(val) => setTitle("")} placeholder="Position" />
          <TextField
            onChange={(val) => setTitle("")}
            placeholder="Company/project"
          />
          <TextField
            onChange={(val) => setTitle("")}
            placeholder="GitHub, .com"
          />
          <TextField
            onChange={(val) => setTitle("")}
            placeholder="LinkedIn, Upwork"
          />
          <Dropdown />
        </div>
        <div>
          <TextArea
            rows={9}
            placeholder="Type Role Desciption"
            onChange={(val) => setTitle("")}
          />
        </div>
        <div className="space-y-1">
          <Calendar label="Start Date" />
          <Calendar label="End Date" />
        </div>
      </div>
    </Card>
  );
};

import { Card, Dropdown, TextField } from "../../elements";
import { useState } from "react";
import { TextArea } from "../../elements/TextAreaComponent";
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
      <div className="flex space-x-6">
        <div>
          <TextField onChange={(val) => setTitle("")} />
          <TextField onChange={(val) => setTitle("")} />
          <TextField onChange={(val) => setTitle("")} />
          <Dropdown/>
        </div>
        <div>
          <TextArea
          rows={7}
          onChange={(val) => setTitle("")} />
        </div>
        <div>
          
        </div>
      </div>
    </Card>
  );
};

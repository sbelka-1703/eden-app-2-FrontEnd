import { Card, TextField } from "../../elements";
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
      <div className="flex">
        <div>
          <TextField onChange={(val) => setTitle("")} />
          <TextField onChange={(val) => setTitle("")} />
          <TextField onChange={(val) => setTitle("")} />
        </div>
        <div>
          <TextArea onChange={(val) => setTitle("")} />
        </div>
      </div>
    </Card>
  );
};

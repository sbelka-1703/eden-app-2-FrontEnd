import { useState } from "react";
import { Card, TextField, Avatar } from "ui";

export interface TopicCommentInputCard {
  src?: string;
  userName?: string;
}

export const TopicCommentInputCard = ({
  src,
  userName,
}: TopicCommentInputCard) => {
  const [comment, setComment] = useState("");
  return (
    <Card shadow={true} className="flex items-center p-4">
      <div className="flex flex-col items-center">
        <p>{userName || ""}</p>
        <Avatar src={src || ""} />
      </div>
      <div className="ml-2 self-end">
        <TextField
          onChange={(e) => {
            setComment(e.target.value);
          }}
          placeholder="Start typing here"
        />
      </div>
    </Card>
  );
};

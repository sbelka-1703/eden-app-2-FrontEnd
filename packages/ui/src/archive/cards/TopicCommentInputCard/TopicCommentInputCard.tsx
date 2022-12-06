import { Avatar, Card, TextField } from "@eden/package-ui";
import { useState } from "react";

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
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
          }}
          placeholder="Start typing here"
        />
      </div>
    </Card>
  );
};

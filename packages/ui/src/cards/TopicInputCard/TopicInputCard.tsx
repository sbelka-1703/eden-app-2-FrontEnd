import { useState } from "react";
import { Card, TextArea, TextHeading1 } from "ui";

export interface TopicInputCard {}

export const TopicInputCard = ({}: TopicInputCard) => {
  const [title, setTitle] = useState("");
  const [desciption, setDesciption] = useState("");
  return (
    <Card shadow={true}>
      <div className="flex flex-col space-y-2">
        <div>
          <TextHeading1>Topic #3:</TextHeading1>
          <TextArea
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            placeholder="Start typing here"
          />
        </div>
        <div>
          <TextHeading1>Desciption:</TextHeading1>
          <TextArea
            onChange={(e) => {
              setDesciption(e.target.value);
            }}
            placeholder="Start typing here"
          />
        </div>
      </div>
    </Card>
  );
};

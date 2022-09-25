import React from "react";
import { Card, TextBody, Avatar } from "ui";
import { MdReply } from "react-icons/md";

export interface TopicCardCommentProps {
  src?: string;
  title?: string;
  messege?: string;
  firstUserName?: string;
  secondUserName?: string;
}

export const TopicCardComment = ({
  src,
  firstUserName,
  secondUserName,
  title,
  messege,
}: TopicCardCommentProps) => {
  return (
    <Card shadow={true}>
      <div className="flex">
        <div className="mr-4 flex flex-col">
          <p>{firstUserName || ""}</p>
          <Avatar src={src || ""} />
        </div>
        <div>
          <div className="flex items-center space-x-1 pl-2">
            <MdReply className="w-[30px] text-gray-400" />
            <p className="font-bold">{secondUserName || ""}</p>
            <p className="text-gray-400">{title || ""}</p>
          </div>
          <div className="flex items-center">
            <TextBody>{messege || ""}</TextBody>
            <MdReply className="w-[30px] text-gray-400" />
          </div>
        </div>
      </div>
    </Card>
  );
};

import React from "react";
import { Card } from "ui";

export interface TopicInputCard {}

export const TopicInputCard = ({}: TopicInputCard) => {
  return (
    <Card shadow={true}>
      <div className="flex"></div>
    </Card>
  );
};

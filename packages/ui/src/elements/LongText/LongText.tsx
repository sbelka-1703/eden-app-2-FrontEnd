import { useState } from "react";

import { Button } from "../Button";

export interface LongTextProps {
  text: string;
  cutText?: number;
  className?: string;
}
export const LongText = ({ text, className, cutText = 50 }: LongTextProps) => {
  const [showAll, setShowAll] = useState(false);

  return (
    <p className={className}>
      {text.slice(0, cutText)}
      {showAll && text.slice(cutText)}
      {text.length >= cutText && (
        <Button
          className="ml-1 border-none text-blue-400"
          style={{ display: "inline-block", padding: 0 }}
          onClick={() => setShowAll((show) => !show)}
        >
          {showAll ? "less" : "more"}...
        </Button>
      )}
    </p>
  );
};

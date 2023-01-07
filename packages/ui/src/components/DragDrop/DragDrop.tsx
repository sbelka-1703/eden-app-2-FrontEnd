import { useState } from "react";
import Draggable from "react-draggable";
import { Button } from "@eden/package-ui";

export interface IDragDropProps {
  title?: string;
  elements?: string[];
  onNext?: () => void;
  onPrev?: () => void;
}

export const DragDrop = ({
  title = "",
  elements = [],
  onNext,
  onPrev,
}: IDragDropProps) => {
  const handleNext = () => {
    if (onNext) onNext!();
  };

  const handleBack = () => {
    if (onPrev) onPrev!();
  };

  return (
    <div className="h-85 flex w-full flex-col gap-4 p-4">
      <div className="text-center text-xl font-semibold">{title}</div>
      <div className="scrollbar-hide relative overflow-scroll p-0">
        <div className=" w-full">
          {elements.map((item, i) => (
            <Draggable
              axis="y"
              bounds="parent"
              grid={[57, 57]}
              handle=".handle"
            >
              <div className="handle cursor-move py-1">
                <div
                  className="font-lg min-w-[70px] rounded-lg bg-slate-400 px-4 py-3 text-center"
                  key={i}
                >
                  {item}
                </div>
              </div>
            </Draggable>
          ))}
        </div>
      </div>
      <div className="flex justify-between pt-6">
        <div>
          {onPrev && (
            <Button radius="rounded" variant={`secondary`} onClick={handleBack}>
              Back
            </Button>
          )}
        </div>
        <Button radius="rounded" variant={`secondary`} onClick={handleNext}>
          Next
        </Button>
      </div>
    </div>
  );
};

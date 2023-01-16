import { useState } from "react";
import { Button } from "@eden/package-ui";
import { DragDropContext } from "@hello-pangea/dnd";
import { Draggable } from "@hello-pangea/dnd";
import { Droppable } from "@hello-pangea/dnd";

export interface IDragDropProps {
  title?: string;
  elements?: { id: string; content: string }[];
  onNext?: () => void;
  onPrev?: () => void;
  onReOrder?: (skillsOrder: string[]) => void;
}

export const DragDrop = ({
  title = "",
  elements = [],
  onNext,
  onPrev,
  onReOrder,
}: IDragDropProps) => {
  const handleNext = () => {
    if (onNext) onNext!();
  };

  const handleBack = () => {
    if (onPrev) onPrev!();
  };

  const [first, setfirst] = useState(elements);

  const reorder = (list: any[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const onDragEnd = (result: any) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const newitems = reorder(
      first,
      result.source.index,
      result.destination.index
    );
    let skillArray: string[] = [];
    newitems.map((items) => {
      skillArray.push(items.content);
    });
    onReOrder && onReOrder(skillArray);

    setfirst(newitems);
  };

  return (
    <div className="flex w-full flex-col gap-4 p-4 text-center text-white">
      <div className="text-md font-thin text-black">{title}</div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable" direction="horizontal">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="flex flex-wrap items-center justify-center gap-4 text-sm text-black"
            >
              {first.map((item: any, index: number) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      className={` w-fit rounded-lg py-1 px-2  ${
                        snapshot.isDragging
                          ? `bg-[#85e3f7] text-black opacity-70 shadow-md shadow-slate-400`
                          : ` bg-[#d1f7ff] `
                      }`}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      {item.content}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <div className="text-sm  text-black">
        Ranked highest means you&apos;re most professional, ranked lowest -
        you&apos;re still learning.
      </div>
      <div className="flex flex-col gap-4 pt-1">
        <div className="flex min-h-[100px]  w-full items-center gap-5 rounded-lg bg-[#EAFFD4] p-2">
          <div className=" text-blue-500">⭐ GODLIKE</div>
          <div className="flex flex-col gap-3  text-black">
            {first.map((item: any, index: number) => (
              <div
                className="w-fit rounded-lg bg-[#d1f7ff] py-1 px-2  "
                key={index}
              >
                {item.content}
              </div>
            ))}
          </div>
        </div>
        <div className="flex min-h-[100px]  w-full items-center gap-5 rounded-lg bg-[#EAFFD4] p-2 opacity-60">
          <div className=" text-blue-500">🎉️ DECENT</div>
          <div className="flex flex-col gap-3  text-black">
            {first.map((item: any, index: number) => (
              <div
                className="w-fit rounded-lg bg-[#d1f7ff] py-1 px-2  "
                key={index}
              >
                {item.content}
              </div>
            ))}
          </div>
        </div>
        <div className="flex min-h-[100px]  w-full items-center gap-5 rounded-lg bg-[#EAFFD4] p-2 opacity-30">
          <div className=" text-blue-500">🤩 LEARNING</div>
          <div className="flex flex-col gap-3  text-black">
            {first.map((item: any, index: number) => (
              <div
                className="w-fit rounded-lg bg-[#d1f7ff] py-1 px-2  "
                key={index}
              >
                {item.content}
              </div>
            ))}
          </div>
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

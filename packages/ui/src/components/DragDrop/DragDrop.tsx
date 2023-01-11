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
    <div className="h-85 flex w-full flex-col gap-4 p-4 text-center text-white">
      <div className="text-xl font-semibold text-black">{title}</div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {first.map((item: any, index: number) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      className={`mb-4 w-full rounded-lg p-3 ${
                        snapshot.isDragging
                          ? `bg-green-500 text-black opacity-70 shadow-md shadow-slate-400`
                          : ` bg-slate-400 `
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

import { Draggable } from "@hello-pangea/dnd";
import { Droppable } from "@hello-pangea/dnd";
import clsx from "clsx";

const Column = ({ column, tasks }: { column: any; tasks: any }) => {
  const itemcls = clsx(`flex min-h-[100px] flex-1 px-2 gap-3`, {
    "flex-col": column.title !== "",
  });
  return (
    <div
      className={`bg-opacity-${column.opacity} flex min-h-[120px] w-full items-center gap-4 rounded-lg bg-[#EAFFD4] p-2 `}
    >
      {column.title !== "" && (
        <div className=" text-blue-500">{column.title}</div>
      )}
      <Droppable
        droppableId={column.id}
        direction={column.title == "" ? "horizontal" : "vertical"}
      >
        {(droppableProvided, droppableSnapshot) => (
          <div
            className={itemcls}
            ref={droppableProvided.innerRef}
            {...droppableProvided.droppableProps}
          >
            {tasks.map((task: any, index: number) => (
              <Draggable key={task.id} draggableId={`${task.id}`} index={index}>
                {(draggableProvided, draggableSnapshot) => (
                  <div
                    className={`h-fit rounded-lg bg-[#d1f7ff] px-2 text-sm  text-black`}
                    ref={draggableProvided.innerRef}
                    {...draggableProvided.draggableProps}
                    {...draggableProvided.dragHandleProps}
                  >
                    <span>{task.content}</span>
                  </div>
                )}
              </Draggable>
            ))}
            {droppableProvided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;

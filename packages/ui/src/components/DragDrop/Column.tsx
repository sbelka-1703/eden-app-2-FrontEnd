import { Draggable } from "@hello-pangea/dnd";
import { Droppable } from "@hello-pangea/dnd";
import clsx from "clsx";

const Column = ({ column, tasks }: { column: any; tasks: any }) => {
  const itemcls = clsx(
    `flex flex-wrap min-h-[100px] justify-center flex-1 px-2 gap-3 ${
      column.title !== "" && "flex-col justify-start"
    } `
  );
  return (
    <div
      className={`${column.opacity === 0 && "bg-opacity-0"} ${
        column.opacity === 30 && "bg-opacity-30"
      } ${
        column.opacity === 60 && "bg-opacity-60"
      } flex min-h-[120px] w-full items-center gap-4 rounded-lg bg-[#EAFFD4] p-2 `}
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
                    className={`h-fit rounded-lg bg-[#d1f7ff] px-2 text-left text-sm text-black`}
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

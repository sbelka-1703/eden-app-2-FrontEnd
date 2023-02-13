import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

import { PlusIcon, XIcon } from "@heroicons/react/outline";
import { PlusSmIcon } from "@heroicons/react/solid";
import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import { Layouts, Responsive, WidthProvider } from "react-grid-layout";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const labels = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL"];
const _mockdata = {
  labels: labels,
  datasets: [
    {
      label: "My First Dataset",
      data: [65, 59, 80, 81, 56, 55, 40],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(255, 159, 64, 0.2)",
        "rgba(255, 205, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(201, 203, 207, 0.2)",
      ],
      borderColor: [
        "rgb(255, 99, 132)",
        "rgb(255, 159, 64)",
        "rgb(255, 205, 86)",
        "rgb(75, 192, 192)",
        "rgb(54, 162, 235)",
        "rgb(153, 102, 255)",
        "rgb(201, 203, 207)",
      ],
      borderWidth: 1,
    },
  ],
};

export const AdminReportsContainer = () => {
  const [layouts, setLayouts] = useState<Layouts>({});
  const [widgetArray, setWidgetArray] = useState([
    {
      i: "widget1",
      x: 0,
      y: 0,
      w: 2,
      h: 2,
      content: { type: null as null | string },
    },
    {
      i: "widget2",
      x: 2,
      y: 2,
      w: 2,
      h: 2,
      content: { type: null as null | string },
    },
    {
      i: "widget3",
      x: 4,
      y: 4,
      w: 2,
      h: 2,
      content: { type: null as null | string },
    },
  ]);

  const handleModify = (layouts: any, layout: any) => {
    const tempArray = widgetArray;

    setLayouts(layout);
    layouts?.map((position: any) => {
      tempArray[Number(position.i)].x = position.x;
      tempArray[Number(position.i)].y = position.y;
      tempArray[Number(position.i)].w = position.w;
      tempArray[Number(position.i)].h = position.h;
    });
    setWidgetArray(tempArray);
  };

  const handleAdd = () => {
    setWidgetArray([
      ...widgetArray,
      {
        i: "widget" + (widgetArray.length + 1),
        x: 0,
        y: 0,
        w: 2,
        h: 2,
        content: { type: null as null | string },
      },
    ]);
  };

  const handleDelete = (key: any) => {
    const tempArray = widgetArray.slice();
    const index = tempArray.indexOf(tempArray.find((data) => data.i === key)!);

    tempArray.splice(index, 1);
    setWidgetArray(tempArray);
  };

  return (
    <div className="w-full h-9/10 overflow-y-scroll">
      <button
        className="fixed right-12 bottom-12 z-10 text-white text-bold rounded-full bg-accentColor hover:cursor-pointer hover:bg-black"
        onClick={() => handleAdd()}
      >
        <PlusSmIcon width={48} />
      </button>

      <ResponsiveReactGridLayout
        onLayoutChange={handleModify}
        verticalCompact={true}
        layouts={layouts}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        preventCollision={false}
        cols={{ lg: 8, md: 8, sm: 4, xs: 2, xxs: 2 }}
        autoSize={true}
        margin={{
          lg: [20, 20],
          md: [20, 20],
          sm: [20, 20],
          xs: [20, 20],
          xxs: [20, 20],
        }}
      >
        {widgetArray?.map((widget, index) => {
          return (
            <div
              className="reactGridItem rounded-lg shadow-sm bg-white relative p-4"
              key={index}
              data-grid={{
                x: widget?.x,
                y: widget?.y,
                w: widget?.w,
                h: widget?.h,
                i: widget.i,
                minW: 2,
                maxW: Infinity,
                minH: 2,
                maxH: Infinity,
                isDraggable: true,
                isResizable: true,
              }}
            >
              <h3>
                <input
                  type="text"
                  defaultValue={widget.i}
                  className="w-8/10 outline-none mb-8"
                  onChange={() => {}}
                />
              </h3>
              <button
                className="deleteButton absolute right-2 top-2"
                onClick={() => handleDelete(widget.i)}
              >
                <XIcon className="inline-block h-4 w-4 cursor-pointer text-gray-900 hover:text-slate-400" />
              </button>
              <section>
                {!widget.content?.type ? (
                  <select
                    onChange={(e) => {
                      const _newWidgetArray = [...widgetArray];

                      _newWidgetArray[index].content = {
                        type: e.currentTarget.value,
                      };

                      setWidgetArray(_newWidgetArray);
                    }}
                  >
                    <option value="" disabled selected>
                      Select your option
                    </option>
                    <option value={"graph"}>graph</option>
                    <option value={"text"}>text</option>
                  </select>
                ) : (
                  <>
                    {widget.content?.type === "graph" && (
                      <Bar data={_mockdata} />
                    )}
                    {widget.content?.type === "text" && (
                      <textarea
                        className="w-full outline-none h-60"
                        placeholder="Type some text here..."
                      ></textarea>
                    )}
                  </>
                )}
              </section>
            </div>
          );
        })}
      </ResponsiveReactGridLayout>
    </div>
  );
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: "Design-System/Colors",
};

const colors = [
  {
    name: "soilGreen",
    description: "",
  },
];

const scales = [
  "50",
  "100",
  "200",
  "300",
  "400",
  "500",
  "600",
  "700",
  "800",
  "900",
];

const ColorBox = ({ color, scale }: { color: string; scale: string }) => {
  console.log(color, scale);
  return (
    <div>
      <div className={`h-16 w-48 bg-${color}-${scale} rounded-lg border`}></div>
      <div
        className={"my-2 flex w-48 justify-between font-semibold text-gray-900"}
      >
        <div className={""}>{scale}</div>
        <div className={""}>{color}</div>
      </div>
    </div>
  );
};

const BrandColors = [
  {
    name: "background",
    description: "primary",
  },
  {
    name: "accentColor",
    description: "primary",
  },
  {
    name: "darkGreen",
    description: "primary",
  },
  {
    name: "soilOrange",
    description: "secondary",
  },
  {
    name: "soilPurple",
    description: "secondary",
  },
  {
    name: "soilTurquoise",
    description: "secondary",
  },
  {
    name: "soilYellow",
    description: "secondary",
  },
  {
    name: "soilBlue",
    description: "secondary",
  },
  {
    name: "soilGray",
    description: "secondary",
  },
];

const Brand = () => {
  return (
    <div>
      <div
        className={
          "my-4 text-center text-3xl font-bold uppercase text-gray-700"
        }
      >
        Branded Colors
      </div>
      <div className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"}>
        {BrandColors.map((scale, index) => (
          <div key={index} className={"my-2"}>
            <div
              className={`h-16 w-48 bg-${scale.name} rounded-lg border`}
            ></div>
            <div
              className={
                "my-2 flex w-48 justify-between font-semibold text-gray-900"
              }
            >
              <div className={""}>{scale.description}</div>
              <div className={""}>{scale.name}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const Colors = () => {
  return (
    <div>
      <Brand />
      {colors.map((color) => (
        <div key={color.name} className={"my-4"}>
          <div className={"text-lg font-bold uppercase text-gray-700"}>
            {color.name}
          </div>
          <p className={"text-gray-700"}>{color.description}</p>
          <div className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"}>
            {scales.map((scale) => (
              <div key={scale} className={"my-2"}>
                <ColorBox color={color.name} scale={scale} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

// eslint-disable-next-line no-unused-vars
const ForceColors = () => {
  return (
    <div>
      <div className={`bg-background`}></div>
      <div className={`bg-accentColor`}></div>
      <div className={`bg-darkGreen`}></div>
      <div className={`bg-soilOrange`}></div>
      <div className={`bg-soilPurple`}></div>
      <div className={`bg-soilTurquoise`}></div>
      <div className={`bg-soilYellow`}></div>
      <div className={`bg-soilBlue`}></div>
      <div className={"bg-soilGreen-50"}></div>
      <div className={"bg-soilGreen-100"}></div>
      <div className={"bg-soilGreen-200"}></div>
      <div className={"bg-soilGreen-300"}></div>
      <div className={"bg-soilGreen-400"}></div>
      <div className={"bg-soilGreen-500"}></div>
      <div className={"bg-soilGreen-600"}></div>
      <div className={"bg-soilGreen-700"}></div>
      <div className={"bg-soilGreen-800"}></div>
      <div className={"bg-soilGreen-900"}></div>
    </div>
  );
};

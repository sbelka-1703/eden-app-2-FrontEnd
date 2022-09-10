export type ProgressBarGenericProps = {
  progress: number;
};

export const ProgressBarGeneric = ({ progress }: ProgressBarGenericProps) => {
  return (
    <div className="mb-2 h-3 w-full rounded-sm bg-gray-100">
      <div
        className="bg-soilBlue h-3 rounded-sm"
        style={{ width: `${progress}%`, transition: "width 0.12s ease-in-out" }}
      ></div>
    </div>
  );
};

export default ProgressBarGeneric;

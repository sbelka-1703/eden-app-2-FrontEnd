import { GrBug } from "react-icons/gr";

export const ReportBugButton = () => {
  return (
    <div className="group relative ml-4">
      <a href="mailto: eden.protocol.dev@gmail.com">
        <button className="border-accentColor rounded-full border-2 p-2">
          <GrBug />
        </button>
      </a>
      <div className="absolute top-10 -right-4 hidden w-28 rounded-md bg-white py-1 px-2 text-center text-sm text-slate-800 shadow group-hover:block">
        Report a bug
      </div>
    </div>
  );
};

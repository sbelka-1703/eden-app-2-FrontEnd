import { ServerTemplate } from "@eden/package-graphql/generated";
import {
  RangeChartOne,
  ServerSelector,
  UserAttributeChart,
} from "@eden/package-ui";
import { useState } from "react";
// import { TextInputLabel } from "@eden/package-ui";
import { GoSettings } from "react-icons/go";
export interface IFilterCompProps {
  data: number[];
  // eslint-disable-next-line no-unused-vars
  onChangeRange?: (data: {
    domain: number[];
    update: number[];
    values: number[];
  }) => void;
}

export const FilterComp = ({ data, onChangeRange }: IFilterCompProps) => {
  const [showDrawer, setShowDrawer] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [range, setRange] = useState({
    experience: 20,
    accountability: 20,
    skillMatch: 20,
    availability: 20,
  });
  // eslint-disable-next-line no-unused-vars
  const [selectedServer, setSelectedServer] = useState<ServerTemplate>({});

  return (
    <div>
      <div className="text-left">
        <button
          className="mr-2 mb-2 rounded-full bg-blue-700 px-5 py-2.5 text-base font-semibold text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="button"
          onClick={() => {
            setShowDrawer(true);
          }}
        >
          <GoSettings />
        </button>
      </div>
      {showDrawer && (
        <div
          className="fixed left-80 top-3 z-40 h-4/5 w-80 -translate-x-full overflow-y-auto rounded-r-xl bg-slate-100	p-4 transition-transform duration-150 ease-in"
          aria-labelledby="drawer-label"
        >
          <h5
            id="drawer-label"
            className="mb-4 inline-flex items-center text-lg font-semibold text-stone-800"
          >
            Filters:
          </h5>
          <button
            type="button"
            className="absolute top-2.5 right-2.5 inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={() => {
              setShowDrawer(false);
            }}
          >
            <svg
              aria-hidden="true"
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Close menu</span>
          </button>
          <div className="mb-6 text-base capitalize text-gray-400">
            What is your Budget?
            <div className="h-2 w-64">
              <RangeChartOne
                data={data}
                onChange={onChangeRange}
                minCaption="$"
                maxCaption="$$$$"
              />
            </div>
          </div>
          <div className="mt-64 text-base capitalize text-gray-400">
            What is your Priority?
            <div className="h-2 w-64">
              <UserAttributeChart
                companies={[
                  {
                    companyInfo: {
                      attributes: range,
                      discordName: "priorities",
                    },
                  },
                ]}
              />
            </div>
          </div>
          <div className="mt-64 mb-10 text-base capitalize text-gray-400">
            Do you want to search in other servers?
            <div className="h-2 w-64">
              <ServerSelector
                compareServerID={[]}
                onChangeServer={(val) => setSelectedServer(val)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

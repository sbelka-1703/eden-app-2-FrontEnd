import {
  Endorsements,
  Maybe,
  PreviusProjectsType,
} from "@eden/package-graphql/generated";
import {
  Card,
  EndorsementList,
  TextHeading3,
  TextLabel,
} from "@eden/package-ui";
import React from "react";

export interface IUserBackgroundProps {
  background: Array<Maybe<PreviusProjectsType>>;
  initialEndorsements: Array<Maybe<Endorsements>>;
  experienceOpen: number | null;
  setExperienceOpen: React.Dispatch<React.SetStateAction<number | null>>;
}

export const UserBackground = ({
  background,
  initialEndorsements,
  experienceOpen,
  setExperienceOpen,
}: IUserBackgroundProps) => {
  return (
    <div>
      <div className="mb-6">
        <TextHeading3
          style={{ fontWeight: 700 }}
          className="mb-4 text-sm uppercase text-gray-500"
        >
          🎡 Background
        </TextHeading3>
        {background?.map((item, index) => {
          const empty =
            !item?.description && !item?.startDate && !item?.endDate;

          return (
            <div key={index} className="mb-4">
              <div className="mb-2 flex items-center">
                <span
                  className={`mr-3 ${
                    empty ? "cursor-default text-slate-400" : "cursor-pointer"
                  }`}
                  onClick={() => {
                    if (!empty)
                      setExperienceOpen(
                        index === experienceOpen ? null : index
                      );
                  }}
                >
                  {!empty && index === experienceOpen ? "▼" : "▶"}
                </span>
                <div className="min-w-30 flex h-8 w-1/2 items-center !rounded-full border-0 bg-cyan-200 px-4 outline-0">
                  {item?.title}
                </div>
                {index < 2 && <span className="ml-3 text-xl">⭐️</span>}
              </div>
              {index === experienceOpen && (
                <Card border className="grid grid-cols-2 py-4 px-6">
                  <div className="col-span-1">
                    <TextLabel>Description</TextLabel>
                    <p>{item?.description}</p>
                  </div>
                  <div className="col-span-1">
                    <TextLabel>Timeline</TextLabel>
                    {item?.startDate && (
                      <p>
                        {`${new Date(Number(item?.startDate)).toLocaleString(
                          "default",
                          {
                            month: "short",
                          }
                        )} ${new Date(
                          Number(item?.startDate)
                        ).getFullYear()} - ${
                          item?.endDate
                            ? `${new Date(Number(item?.endDate)).toLocaleString(
                                "default",
                                { month: "short" }
                              )} ${new Date(
                                Number(item?.endDate)
                              ).getFullYear()}`
                            : "present"
                        }`}
                      </p>
                    )}
                  </div>
                </Card>
              )}
            </div>
          );
        })}
      </div>
      {initialEndorsements && (
        <div className="mt-3">
          <EndorsementList endorsements={initialEndorsements} />
        </div>
      )}
    </div>
  );
};

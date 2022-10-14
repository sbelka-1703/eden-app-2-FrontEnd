import { Maybe, RoleType } from "@eden/package-graphql/generated";
import { Badge, Card } from "@eden/package-ui";
import { useState } from "react";
import { BsDot } from "react-icons/bs";
import { MdArrowForward } from "react-icons/md";
import ReactTooltip from "react-tooltip";

import { round } from "../../../utils";

export interface RoleCardProps {
  role?: Maybe<RoleType>;
  percentage?: number;
  onApply?: () => void;
}

export const RoleCard = ({ role, percentage = 0, onApply }: RoleCardProps) => {
  const [isHoverDescription, setIsHoverDescription] = useState("");
  const [isHoverResponsibilities, setIsHoverResponsibilities] = useState("");

  const shortenText = (text: string) => {
    if (text.length > 90) {
      return text.substring(0, 90) + "...";
    }
    return text;
  };

  return (
    <Card border shadow className="bg-white p-0">
      <div className="flex  flex-col justify-between p-4">
        <div className="flex flex-col justify-between border-b pb-3">
          <div className="justify-flex-start -ml-3 flex flex-row content-center items-center text-xl capitalize">
            <span className="">
              <BsDot color="#D9D9D9" size={30} />
            </span>
            <span>{role?.title}</span>
          </div>
          <div className={`items-flex-start mt-1 flex h-full flex-row`}>
            <span className="text-2xl">⚡</span>
            <span className={`text-soilPurple text-2xl font-semibold`}>
              {round(Number(percentage), 1)}%
            </span>
          </div>
        </div>
        <div className={`mt-4 w-full`}>
          <div className={`flex flex-wrap`}>
            {role?.skills?.map((skill, index) => (
              <div key={index}>
                {index < 5 && (
                  <Badge
                    className={`mr-2 text-sm`}
                    text={skill?.skillData?.name || ""}
                    colorRGB={`235,225,255`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex flex-grow">
            <div className={`mr-auto ml-1`}>
              <div className="flex flex-row p-1">
                <div>⏳</div>
                <div className={`ml-4 mt-0.5 text-sm capitalize text-zinc-400`}>
                  {role?.hoursPerWeek} hours/week
                </div>
              </div>
              <div className="flex flex-row p-1">
                <div>💼</div>
                <div className={`ml-3 text-sm text-zinc-400`}>
                  {role?.description && (
                    <>
                      <div className={`font-medium`}>Role Description :</div>
                      <div
                        data-tip={isHoverDescription}
                        data-for={`badgeTip-${role?.description}`}
                        className={`mr-2 mb-1 inline-block cursor-default rounded-full`}
                        onMouseEnter={() => {
                          setIsHoverDescription(`${role?.description}`);
                        }}
                        onMouseLeave={() => {
                          setIsHoverDescription("");
                        }}
                      >
                        {shortenText(role?.description as string)}
                      </div>
                      <ReactTooltip
                        id={`badgeTip-${role?.description}`}
                        place="top"
                        effect="solid"
                      >
                        {isHoverDescription}
                      </ReactTooltip>{" "}
                    </>
                  )}
                  {role?.keyRosponsibilities && (
                    <>
                      <div className={`mt-1.5 font-medium`}>
                        Key Responsibilities :
                      </div>
                      <div
                        data-tip={isHoverResponsibilities}
                        data-for={`badgeTip-${role?.keyRosponsibilities}`}
                        className={`mr-2 mb-1 inline-block cursor-default rounded-full`}
                        onMouseEnter={() => {
                          setIsHoverResponsibilities(
                            `${role?.keyRosponsibilities}`
                          );
                        }}
                        onMouseLeave={() => {
                          setIsHoverResponsibilities("");
                        }}
                      >
                        {shortenText(role?.keyRosponsibilities as string)}
                      </div>
                      <ReactTooltip
                        id={`badgeTip-${role?.keyRosponsibilities}`}
                        place="top"
                        effect="solid"
                      >
                        {isHoverResponsibilities}
                      </ReactTooltip>{" "}
                    </>
                  )}
                </div>
              </div>
              {role?.openPositions && (
                <div className="flex flex-row p-1">
                  <div>📌</div>
                  <div className={`ml-3 mt-0.5 text-sm text-zinc-400`}>
                    Open Seats: {role?.openPositions}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={onApply}
        className="align-center bg-accentColor mt-4 flex w-full justify-center rounded-b-2xl py-3 px-2 text-lg"
      >
        <div className="align-center flex w-full cursor-pointer justify-center text-base text-black">
          <div>Apply for this role</div>
          <div className="mt-1 ml-1">
            <MdArrowForward />
          </div>
        </div>
      </button>
    </Card>
  );
};

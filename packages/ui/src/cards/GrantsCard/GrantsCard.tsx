import { GrantTemplate, Maybe } from "@eden/package-graphql/generated";
import {
  Avatar,
  Badge,
  Button,
  Card,
  GrantsModal,
  LongText,
  TextHeading2,
  TextHeading3,
  // TextLabel,
} from "@eden/package-ui";
import { useState } from "react";

// import { round } from "../../../utils";

export interface IGrantsCardProps {
  grant?: Maybe<GrantTemplate>;
  item?: any;
}

export const GrantsCard = ({ grant }: IGrantsCardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  // return null;
  if (!grant) return null;

  return (
    <Card border>
      <div className={`flex justify-between`}>
        <div>
          <div className={`relative flex flex-col items-center`}>
            <div className="relative">
              <Avatar isProject src={grant?.avatar as string} />

              {/* {matchPercentage?.totalPercentage && (
                <div
                  className={`text-soilPurple absolute -mt-9 ml-12 rounded-full bg-white px-1.5 text-xl font-semibold shadow-sm`}
                >
                  {round(Number(matchPercentage?.totalPercentage), 0)}%
                </div>
              )} */}
            </div>
          </div>
        </div>
        <div>
          <div className={`text-darkGreen font-poppins text-xl font-semibold`}>
            {grant?.name}
          </div>
          <div>
            {grant?.tags && (
              <div>
                <div>
                  {grant &&
                    grant?.tags &&
                    grant?.tags
                      .slice(0, 6)
                      .map((tag, index) => (
                        <Badge
                          text={tag || ""}
                          key={index}
                          className={`bg-[#FF6F8980] py-px text-xs`}
                        />
                      ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex">
        <LongText
          cutText={100}
          text={(grant?.smallDescription as string) || ""}
          className={`text-darkGreen font-Inter my-2 text-sm`}
        />
      </div>
      <div
        className={`my-4 w-full rounded-2xl bg-gradient-to-r from-[#00E0FD33] to-[#F800CD33] p-4 text-center shadow-md`}
      >
        <TextHeading2>{grant?.amount}</TextHeading2>
        <TextHeading3>🗓 by Dec 15th</TextHeading3>
      </div>
      <div className={`font-Inter text-lg font-medium text-zinc-400`}>
        Difficulty:{" "}
        <span className={`text-accentColor text-xl uppercase`}>
          {grant?.difficulty}
        </span>
      </div>
      <div className={`font-Inter text-lg font-medium text-zinc-400`}>
        Distributed to date:{" "}
        <span className={`text-accentColor text-xl uppercase`}>
          {grant?.discributed}/20
        </span>
      </div>

      <div className={`flex justify-end`}>
        <Button onClick={() => setIsOpen(!isOpen)}>More</Button>
      </div>

      <GrantsModal
        open={isOpen}
        grant={grant}
        onClose={() => setIsOpen(!isOpen)}
      />
    </Card>
  );
};

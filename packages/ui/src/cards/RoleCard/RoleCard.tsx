import { Maybe, RoleType } from "@eden/package-graphql/generated";
import { Badge, Card } from "@eden/package-ui";
import { BsDot } from "react-icons/bs";
import { MdArrowForward } from "react-icons/md";

export interface RoleCardProps {
  role?: Maybe<RoleType>;
  percentage?: number;
  jds?: String[];
  openSeats?: string;
  onApply?: () => void;
}

export const RoleCard = ({
  role,
  percentage = 0,
  // jds,
  // openSeats,
  onApply,
}: RoleCardProps) => {
  // console.log("role", role);

  function round(value: number, precision: number) {
    var multiplier = Math.pow(10, precision || 0);

    return Math.round(value * multiplier) / multiplier;
  }

  return (
    <Card border shadow className="bg-white p-0">
      <div className="flex flex-col justify-between p-4">
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
        <div className={`mt-4 h-20 w-full`}>
          <div className="flex">
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

            {/* <div className={`mr-auto ml-1`}>
              <div className="flex flex-row p-1">
                <div>⏳</div>
                <div className={`ml-3 mt-0.5 text-sm capitalize text-zinc-400`}>
                  hours/week
                </div>
              </div>
              <div className="flex flex-row p-1">
                <div>💼</div>
                <div className={`ml-3 text-sm text-zinc-400`}>
                  {jds?.map((jd, index) => {
                    return (
                      <div className="my-1.5" key={index}>
                        {jd}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="flex flex-row p-1">
                <div>📌</div>
                <div className={`ml-3 mt-0.5 text-sm text-zinc-400`}>
                  Open Seats: {openSeats}
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
      <div className="align-center bg-accentColor mt-4 flex w-full justify-center rounded-b-2xl py-3 px-2 text-lg">
        <button onClick={onApply}>
          <div className="align-center flex w-full cursor-pointer justify-center text-base text-black">
            <div>Apply for this role</div>
            <div className="mt-1 ml-1">
              <MdArrowForward />
            </div>
          </div>
        </button>
      </div>
    </Card>
  );
};

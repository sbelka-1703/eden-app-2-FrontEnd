import { Maybe, RoleType } from "@graphql/eden/generated";
import { BsDot } from "react-icons/bs";
import { MdArrowForward } from "react-icons/md";
import { Card } from "ui";

export interface RoleCardProps {
  role?: Maybe<RoleType>;
  percentage?: number;
  jds?: String[];
  openSeats?: string;
}

export const RoleCard = ({
  role,
  percentage,
  jds,
  openSeats,
}: RoleCardProps) => {
  console.log("role", role);

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
              {percentage}%
            </span>
          </div>
        </div>
        <div className={`mt-4 w-full`}>
          <div className="flex h-full">
            <div className={`mr-auto ml-1`}>
              <div className="flex flex-row p-1">
                <div>⏳</div>
                <div className={`ml-3 mt-0.5 text-sm capitalize text-zinc-400`}>
                  {role?.hoursPerWeek} hours/week
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
            </div>
          </div>
        </div>
      </div>
      <div className="align-center bg-accentColor mt-4 flex w-full justify-center rounded-b-2xl py-3 px-2 text-lg">
        <button onClick={() => console.log(`apply`)}>
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

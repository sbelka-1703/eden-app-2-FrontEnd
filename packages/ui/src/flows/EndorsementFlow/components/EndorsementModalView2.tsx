import { Members, Project } from "@eden/package-graphql/generated";
import { Avatar, Card, TextHeading2, TextLabel2 } from "@eden/package-ui";
import { useState } from "react";

import { EndorseButton, StarRating } from "./";

interface IEndorsementModalView2Props {
  member?: Members;
  project?: Project;
  onNext: () => void;
}

export const EndorsementModalView2 = ({
  member,
  onNext,
}: IEndorsementModalView2Props) => {
  const [amountStake, setAmountStake] = useState(0);

  return (
    <div>
      <TextHeading2>
        Do you want to stake money on @{member?.discordName} success?
      </TextHeading2>
      <div className={`flex justify-between`}>
        <div className={`flex flex-col text-center`}>
          <button
            type={`button`}
            className={`bg-soilYellow/60 hover:bg-soilYellow mx-auto h-16 w-16 rounded-full font-medium text-neutral-700`}
            onClick={() => setAmountStake(25)}
          >
            <div className={`text-lg`}>25</div>
            <div className={`text-xs`}>USDC</div>
          </button>
          <span className={`text-xs text-neutral-700`}>~USDC 11-75 RETURN</span>
        </div>
        <div className={`flex flex-col text-center`}>
          <button
            type={`button`}
            className={`bg-soilYellow/60 hover:bg-soilYellow mx-auto h-16 w-16 rounded-full font-medium text-neutral-700`}
            onClick={() => setAmountStake(100)}
          >
            <div className={`text-lg`}>100</div>
            <div className={`text-xs`}>USDC</div>
          </button>
          <span className={`text-xs text-neutral-700`}>
            ~USDC 36-334 RETURN
          </span>
        </div>
        <div className={`flex flex-col text-center`}>
          <button
            type={`button`}
            className={`bg-soilYellow/60 hover:bg-soilYellow mx-auto h-16 w-16 rounded-full font-medium text-neutral-700`}
            onClick={() => setAmountStake(250)}
          >
            <div className={`text-lg`}>250</div>
            <div className={`text-xs`}>USDC</div>
          </button>
          <span className={`text-xs text-neutral-700`}>
            ~USDC 140-670 RETURN
          </span>
        </div>
        <div className={`flex flex-col text-center`}>
          <button
            type={`button`}
            className={`bg-soilYellow/60 hover:bg-soilYellow mx-auto h-16 w-16 rounded-full font-medium text-neutral-700`}
          >
            <div className={`text-base`}>custom</div>
            <div className={`text-xs`}>USDC</div>
          </button>
        </div>
      </div>
      <div className={`my-2`}>
        <TextLabel2>
          Expected return rates are calculated based on past performance of this
          person and can not be guarranted
        </TextLabel2>
      </div>
      <div className={`my-4`}>
        <div className={`text-lg font-medium uppercase text-neutral-700`}>
          This is how your endorsement will look:
        </div>
        <TextLabel2>You are in edit mode</TextLabel2>
        <Card border>
          <div className={`grid grid-cols-3`}>
            <div className={`col-span-2`}>
              <div className={`flex items-center gap-2`}>
                <div>
                  <Avatar src={member?.discordAvatar!} size="sm" />
                </div>
                <div>
                  <div>
                    {member?.discordName && (
                      <span className="text-lg font-medium tracking-wide text-neutral-600">
                        @{member?.discordName}
                      </span>
                    )}
                  </div>
                  <div className="text-xs font-medium uppercase tracking-wide text-neutral-500">
                    {member?.memberRole?.title}
                  </div>
                </div>
              </div>
              <div className={`my-2`}>
                {amountStake !== 0 && (
                  <span
                    className={`bg-soilYellow/60 rounded-full px-2 py-1 font-medium uppercase text-neutral-700`}
                  >
                    Total Stake: {amountStake} USDC
                  </span>
                )}
              </div>
              <div className={`text-neutral-800`}>
                working with this person was awesome
              </div>
            </div>
            <div className={`col-span-1`}>
              <StarRating rating={0} />
            </div>
          </div>
        </Card>
      </div>
      <div className={`my-2 flex justify-end`}>
        <EndorseButton type={`button`} onClick={onNext} />
      </div>
    </div>
  );
};

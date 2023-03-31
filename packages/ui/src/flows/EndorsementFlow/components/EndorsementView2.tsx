import { gql, useQuery } from "@apollo/client";
import { Members } from "@eden/package-graphql/generated";
import {
  Avatar,
  Card,
  Modal,
  TextHeading2,
  TextLabel2,
} from "@eden/package-ui";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AiOutlineArrowLeft } from "react-icons/ai";

// import { IChatMessages } from "./ReviewMemberContainer";
type IChatMessages = any;

const EDEN_GPT_REPLY = gql`
  query ($fields: edenGPTreplyInput!) {
    edenGPTreply(fields: $fields) {
      reply
    }
  }
`;

type ReviewInputs = {
  message: string;
};

import { ReviewButton, StarRating } from "./";

interface IEndorsementView2Props {
  member?: Members;
  onNext: () => void;
  onBack: () => void;
  rating: number;
  // eslint-disable-next-line no-unused-vars
  onRatingChange: (rating: number) => void;
  chatMessages?: IChatMessages[];
}

export const EndorsementView2 = ({
  member,
  onNext,
  onBack,
  rating,
  onRatingChange,
  chatMessages,
}: IEndorsementView2Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [amountStake, setAmountStake] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const { register, handleSubmit, reset, watch } = useForm<ReviewInputs>({
    defaultValues: {
      message: `Working with ${member?.discordName} is a pleasure.  They are a great team player and always willing to help out. I would recommend them to any team.  I look forward to working with them again in the future.`,
    },
  });
  const onSubmit: SubmitHandler<ReviewInputs> = (data) => {
    console.log("submit", data);
    onNext();
  };

  const watchMessage = watch(["message"]);

  const handleCheckReview = () => {
    if (!chatMessages) return;

    // const message = chatMessages.map((chat) => chat.message).join(" ");

    // join all the user messages together
    const message = chatMessages
      .filter((chat) => chat.user === "user")
      .map((chat) => chat.message)
      .join(" ");

    // console.log("message", message);
    const end = `/n/n === /n/nWith the information in the above, write a review statement for ${member?.discordName}`;

    const messageReview = message + end;

    console.log("messageReview", messageReview);

    return messageReview;
  };

  // eslint-disable-next-line no-unused-vars
  const { refetch } = useQuery(EDEN_GPT_REPLY, {
    variables: {
      fields: {
        message: handleCheckReview(),
      },
    },
    skip: chatMessages?.length === 0 || !chatMessages,
    onCompleted: (data: any) => {
      console.log("EDEN_GPT_REPLY data ===>", data);
      console.log("chatMessages", chatMessages);
      // reset({
      //   message: data.edenGPTreply.reply,
      // });
    },
  });

  // useEffect(() => {
  //   if (chatMessages) {
  //     console.log("chatMessages", chatMessages);
  //   }
  // }, [chatMessages]);

  // useEffect(() => {
  //   if (dataReview) {
  //     console.log("dataReview", dataReview);
  //   }
  //   [dataReview];
  // });

  return (
    <>
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(!isModalOpen)}>
        <div className={`p-4 text-center`}>
          <TextHeading2>
            {`Enter a custom stake amount on @${member?.discordName}'s success?`}
          </TextHeading2>
          <div className={`m-auto flex w-1/4 flex-col`}>
            <input
              type={`number`}
              className={`input-primary`}
              placeholder={`Enter amount`}
              value={amountStake}
              onChange={(e) => setAmountStake(Number(e.target.value))}
            />
            <button
              type={`button`}
              className={`rounded-full border-2 bg-[#D7D7FF] px-4 py-1 font-semibold uppercase text-neutral-700 hover:shadow-sm hover:shadow-indigo-300`}
              onClick={() => setIsModalOpen(!isModalOpen)}
            >
              Stake
            </button>
          </div>
        </div>
      </Modal>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={`grid h-full grid-cols-3 gap-4`}>
          <div className={`col-span-2 h-full`}>
            <div className={`text-lg font-medium uppercase text-neutral-700`}>
              {`Staking + Review:`}
            </div>
            <div className={`text-lg font-medium uppercase text-neutral-700`}>
              {`Do you want to stake money on @${member?.discordName}'s success?`}
            </div>

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
                <span className={`text-xs text-neutral-700`}>
                  ~USDC 11-75 RETURN
                </span>
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
                  onClick={() => setIsModalOpen(!isModalOpen)}
                >
                  <div className={`text-base`}>custom</div>
                  <div className={`text-xs`}>USDC</div>
                </button>
              </div>
            </div>
            <div className={`my-2`}>
              <TextLabel2>
                Expected return rates are calculated based on past performance
                of this person and can not be guarranted
              </TextLabel2>
            </div>
            <div className={`text-lg font-medium uppercase text-neutral-700`}>
              Endorsement by Eden AI:
            </div>
            <Card border className={`p-2`}>
              <textarea
                id={`project-description`}
                className={`input-primary border-none`}
                rows={4}
                required
                {...register("message")}
              />
            </Card>
            <div className={`my-4`}>
              <div className={`text-lg font-medium uppercase text-neutral-700`}>
                This is how your endorsement will look:
              </div>
              {/* <TextLabel2>You are in edit mode</TextLabel2> */}
              {/* <button type={`button`} onClick={() => refetch()}>
              refetch
            </button> */}
              <Card border className={`p-2`}>
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
                    <div
                      className={`input-primary scrollbar-hide h-32 overflow-scroll`}
                    >
                      {watchMessage}
                    </div>
                  </div>
                  <div className={`col-span-1`}>
                    <StarRating
                      rating={rating}
                      onRatingChange={onRatingChange}
                    />
                  </div>
                </div>
              </Card>
            </div>
          </div>
          <div></div>
        </div>
        <div className={`grid w-full grid-cols-3`}>
          <div className={`col-span-2`}>
            <button
              type={`button`}
              className={`rounded-full border-2 bg-[#D7D7FF] px-4 py-1 font-semibold uppercase text-neutral-700 hover:shadow-sm hover:shadow-indigo-300`}
              onClick={onBack}
            >
              <AiOutlineArrowLeft className={`mr-2 inline-block`} />
              chat
            </button>
          </div>
          <div className={`col-span-1 grid justify-items-end`}>
            <ReviewButton type={`submit`} />
          </div>
        </div>
      </form>
    </>
  );
};

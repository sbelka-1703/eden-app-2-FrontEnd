import { gql, useQuery } from "@apollo/client";
import { UserContext } from "@eden/package-context";
import { Members } from "@eden/package-graphql/generated";
import {
  Avatar,
  Card,
  Modal,
  TextHeading2,
  TextLabel2,
} from "@eden/package-ui";
import { useContext, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AiOutlineArrowLeft } from "react-icons/ai";

import { IChatMessages } from "../EndorsementFlow";

const EDEN_GPT_ENDORSE_CHAT_API = gql`
  query ($fields: edenGPTEndorseChatAPIInput!) {
    edenGPTEndorseChatAPI(fields: $fields) {
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
  // onWarning: () => void;
  rating: number;
  // eslint-disable-next-line no-unused-vars
  onRatingChange: (rating: number) => void;
  chatMessages?: IChatMessages[];
  amountStake: number;
  // eslint-disable-next-line no-unused-vars
  onAmountStakeChange: (amount: number) => void;
  endorsementMessage: string;
  // eslint-disable-next-line no-unused-vars
  onEndorsementMessageChange: (message: string) => void;
}

export const EndorsementView2 = ({
  member,
  onNext,
  onBack,
  // onWarning,
  rating,
  onRatingChange,
  chatMessages,
  amountStake,
  onAmountStakeChange,
  endorsementMessage,
  onEndorsementMessageChange,
}: IEndorsementView2Props) => {
  const { currentUser } = useContext(UserContext);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { register, handleSubmit, reset, watch } = useForm<ReviewInputs>({
    defaultValues: {
      message: endorsementMessage,
    },
  });
  const onSubmit: SubmitHandler<ReviewInputs> = (data) => {
    // console.log("submit", data);
    if (!currentUser) return;
    onEndorsementMessageChange(data.message);
    onNext();
  };

  const watchMessage = watch(["message"]);

  const systemMessage = {
    role: "system",
    content: `You are an endorser who has just had a conversation about the skills and expertise of an individual (the endorsee, ${member?.discordName}). Provide a brief and concise endorsement for the endorsee, focusing on their skills and qualities. Do not refer to the conversation or the information provided directly. This endorsement should be able to stand on its own and showcase the endorsee's expertise.  The user will ask you to summarize the endorsement, and you will provide a response back in quoatation.`,
  };

  const userFollowUpMessage = {
    role: "user",
    content: "Please, summarize the endorsement.",
  };

  const allMessages = chatMessages?.map((obj: IChatMessages) => {
    if (obj.user === "01") {
      return { role: "assistant", content: obj.message };
    } else {
      return { role: "user", content: obj.message };
    }
  });

  allMessages?.push(systemMessage);
  allMessages?.push(userFollowUpMessage);

  // eslint-disable-next-line no-unused-vars
  const { refetch } = useQuery(EDEN_GPT_ENDORSE_CHAT_API, {
    variables: {
      fields: {
        conversation: allMessages,
        userID: currentUser?._id,
      },
    },
    skip: allMessages?.length === 0,
    onCompleted: (data: any) => {
      // console.log("DATA ===> ", data);

      // the response might be an appologize message from the API
      // TODO: handle this case

      // this is to get the text between the quotes
      const quotedText = data.edenGPTEndorseChatAPI.reply.match(/"([^"]+)"/)[1];

      reset({
        message: quotedText,
      });
    },
  });

  // const handleRefretch = () => {
  //   // console.log("refetch");
  //   console.log("allMessages", allMessages);
  //   refetch();
  // };

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
              onChange={(e) => onAmountStakeChange(Number(e.target.value))}
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
        <div className={`grid h-full grid-cols-3`}>
          <div className={`col-span-2`}>
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
                  onClick={() => onAmountStakeChange(25)}
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
                  onClick={() => onAmountStakeChange(100)}
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
                  onClick={() => onAmountStakeChange(250)}
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
          </div>
          <div></div>
          <div className={`col-span-3`}>
            <TextLabel2>
              Expected return rates are calculated based on past performance of
              this person and can not be guarranted
            </TextLabel2>
          </div>
          {/* <button type={`button`} onClick={() => handleRefretch()}>
              refresh
            </button> */}
          <div className={`col-span-2`}>
            <div className={`text-lg font-medium uppercase text-neutral-700`}>
              Endorsement by Eden AI:{" "}
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
                    <div className={`my-1`}>
                      {amountStake !== 0 && (
                        <span
                          className={`bg-soilYellow/60 rounded-full px-2 py-1 font-medium uppercase text-neutral-700`}
                        >
                          Total Stake: {amountStake} USDC
                        </span>
                      )}
                    </div>
                    {/* <div
                      className={`input-primary scrollbar-hide h-28 overflow-scroll`}
                    >
                      {watchMessage}
                    </div> */}
                  </div>
                  <div className={`col-span-1`}>
                    <StarRating
                      rating={rating}
                      onRatingChange={onRatingChange}
                    />
                  </div>
                </div>
                <div
                  className={`input-primary scrollbar-hide h-24 overflow-scroll`}
                >
                  {watchMessage}
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

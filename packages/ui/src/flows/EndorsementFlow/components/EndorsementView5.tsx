import { gql, useMutation } from "@apollo/client";
import { UserContext } from "@eden/package-context";
import { Members, NodesType } from "@eden/package-graphql/generated";
import { Avatar } from "@eden/package-ui";
import { getFillProfilePercentage } from "@eden/package-ui/utils/fill-profile-percentage";
import { useContext, useState } from "react";
import { HiOutlineMail, HiOutlineMailOpen } from "react-icons/hi";

const EDEN_ADD_ENDORSEMENT = gql`
  mutation ($fields: addEndorsementInput) {
    addEndorsement(fields: $fields) {
      _id
    }
  }
`;

interface IEndorsementView5Props {
  member?: Members;
  onNext: () => void;
  onWarning: () => void;
  onCancel: () => void;
  rating: number;
  endorsedSkills?: NodesType[];
  keywords?: any[];
  amountStake?: number;
  endorsementMessage?: string;
}

export const EndorsementView5 = ({
  member,
  onNext,
  onWarning,
  onCancel,
  rating,
  endorsedSkills,
  keywords,
  amountStake,
  endorsementMessage,
}: IEndorsementView5Props) => {
  const { currentUser } = useContext(UserContext);

  const [sendingEndorsement, setSendingEndorsement] = useState(false);

  const [addEndorsement, {}] = useMutation(EDEN_ADD_ENDORSEMENT, {
    onCompleted({ addEndorsement }) {
      if (!addEndorsement) console.log("addEndorsement is null");
      // console.log("addEndorsement", addEndorsement);
      setSendingEndorsement(false);
    },
  });

  const fields = {
    userSendID: currentUser?._id,
    userReceiveID: member?._id,
    endorsementMessage: endorsementMessage,
    stars: rating - 1,
    stake: amountStake,
    endorseNodes: keywords?.map((obj: any) => {
      return {
        nodeID: obj.nodeID,
      };
    }),
  };

  const handleAddEndorsement = () => {
    setSendingEndorsement(true);
    const percent = getFillProfilePercentage(currentUser || {});

    // console.log("percent", percent);

    addEndorsement({
      variables: {
        fields,
      },
    });

    if (percent && percent < 40) {
      onWarning();
    } else {
      onNext();
    }
  };

  const handleEndorsement = () => {
    console.log("handle endorsement");
    handleAddEndorsement();
  };

  return (
    <div>
      <div className={`my-4 flex justify-center`}>
        <div
          className={`bg-soilYellow/60 flex items-center gap-2 rounded-full`}
        >
          <Avatar size={`sm`} src={member?.discordAvatar || ""} />
          <div className={`py-1 pr-6 text-sm font-medium text-zinc-700`}>
            <div>
              <span className={`text-lg font-semibold text-zinc-700`}>
                {member?.discordName || ""}
              </span>{" "}
              invited you to endorse them for
            </div>
            <div>
              their expertise in
              {endorsedSkills?.map((node) => (
                <span
                  key={node?.nodeData?._id}
                  className={`text-soilPurple px-1 text-lg font-semibold`}
                >
                  {node?.nodeData?.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      {!sendingEndorsement && (
        <div className={`my-8 grid grid-cols-2 gap-4 md:gap-16`}>
          <button
            type={`button`}
            onClick={handleEndorsement}
            className={`bg-soilBlue/40 hover:bg-soilBlue/60 flex justify-center space-x-4 rounded-full py-1 uppercase`}
          >
            <div className={`my-auto font-semibold text-zinc-800 sm:text-lg`}>
              Endorse
            </div>
            <div className={`text-center`}>
              <div className={`text-xs text-zinc-500`}>Risk</div>
              <div
                className={`xs:text-base text-sm font-semibold text-zinc-800`}
              >
                15%
              </div>
            </div>
            <div className={`text-center`}>
              <div className={`text-xs text-zinc-500`}>Reward</div>
              <div
                className={`xs:text-base text-sm font-semibold text-yellow-500`}
              >
                ${member?.endorsementsSendStats?.totalReward || 0}
              </div>
            </div>
          </button>
          <button
            type={`button`}
            onClick={onCancel}
            className={`flex justify-center space-x-4 rounded-full bg-zinc-300/40 py-1 uppercase hover:bg-zinc-300/60`}
          >
            <div className={`my-auto font-semibold text-zinc-800 sm:text-lg`}>
              Reject
            </div>
            <div className={`text-center`}>
              <div className={`text-xs text-zinc-500`}>Risk</div>
              <div
                className={`xs:text-base text-sm font-semibold text-zinc-800`}
              >
                0%
              </div>
            </div>
            <div className={`text-center`}>
              <div className={`text-xs text-zinc-500`}>Reward</div>
              <div
                className={`xs:text-base text-sm font-semibold text-yellow-500`}
              >
                $0
              </div>
            </div>
          </button>
        </div>
      )}
      <div
        className={`my-2 text-center text-2xl font-semibold uppercase text-zinc-800`}
      >
        {member?.discordName}&apos;s Stats
      </div>
      <div className={`gap-4 sm:grid sm:grid-cols-2`}>
        <div
          className={`col-span-1 text-center text-base font-semibold uppercase`}
        >
          <div className={`my-2 flex justify-between`}>
            <div className={``}>
              <div className={`flex justify-center text-zinc-400`}>
                Total Income:
              </div>
              <div className={`flex justify-center text-zinc-800`}>
                ${member?.totalIncome || 0}
              </div>
            </div>
            <div className={``}>
              <div className={`flex justify-center text-zinc-400`}>
                My Trust Level:
              </div>
              <div className={`flex justify-center text-zinc-800`}>
                Legendary 🔥
              </div>
            </div>
          </div>
          <div className={`my-2 flex justify-between`}>
            <div className={``}>
              <div className={`flex justify-center text-zinc-400`}>
                Endorsements:
              </div>
              <div className={`flex justify-center gap-4 text-zinc-800`}>
                <span className={`flex`}>
                  <HiOutlineMail className={`my-auto mr-1 h-4 text-zinc-400`} />{" "}
                  {member?.endorsementsReceive?.length || 0}
                </span>
                <span className={`flex`}>
                  <HiOutlineMailOpen
                    className={`my-auto mr-1 h-4 text-zinc-400`}
                  />{" "}
                  {member?.endorsementsSend?.length || 0}
                </span>
              </div>
            </div>
            <div className={``}>
              <div className={`flex justify-center text-zinc-400`}>
                Reputation Score:
              </div>
              <div className={`text-soilGreen-900 flex justify-center`}>
                {member?.endorsementsSendStats?.reputation || 0}%
              </div>
            </div>
          </div>
          <div className={`my-4 flex w-full justify-center`}>
            <span
              className={`bg-soilGreen-600/20 rounded-full px-4 py-1 text-base font-semibold uppercase text-zinc-400`}
            >
              <div>
                Risk:
                <span className={`text-soilGreen-900 pl-2`}>15% Low</span>
              </div>
              <div>
                Reward:
                <span className={`pl-2 text-yellow-500`}>
                  ~${member?.endorsementsSendStats?.totalReward || 0}
                </span>
              </div>
            </span>
          </div>
        </div>
        <div
          className={`col-span-1 space-y-2 font-medium uppercase text-zinc-700`}
        >
          <div>
            Eden Endorsement Allows You to Stake Your Reputation By Recommending
            People to the Network
          </div>
          <div>
            {`If You Successfully Endorsed A Person - You'll Receive A Reward`}
          </div>
          <div>
            {`If You Endorsed A Person With Poor Performance - You'll Lose
            Reputation Points`}
          </div>
        </div>
      </div>
    </div>
  );
};

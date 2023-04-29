import { gql, useMutation, useQuery } from "@apollo/client";
import { UserContext } from "@eden/package-context";
import {
  CandidateProfileCard,
  Card,
  GridItemNine,
  GridItemThree,
  GridLayout,
  TextInputLabel,
} from "@eden/package-ui";
import { useContext, useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  // FaDiscord,
  // FaGithub,
  // FaLinkedin,
  FaTelegram,
  FaTwitter,
} from "react-icons/fa";
import { HiOutlineMail, HiOutlineMailOpen } from "react-icons/hi";
import { toast } from "react-toastify";

import { DropdownMenu } from "./components/DropdownMenu";

const CREATE_ENDORSEMENT_LINK = gql`
  mutation ($fields: createEndorsementLinkInput) {
    createEndorsementLink(fields: $fields) {
      _id
    }
  }
`;

const FIND_NODES = gql`
  query ($fields: findNodesInput) {
    findNodes(fields: $fields) {
      _id
      name
      node
    }
  }
`;

type EndorsementInputs = {
  node: {
    value: string;
    label: string;
  };
  message: string;
};

export const EndorsementLinkFlow = ({}) => {
  const { currentUser } = useContext(UserContext);
  const { register, handleSubmit, control, watch, setValue } =
    useForm<EndorsementInputs>({});
  const onSubmit: SubmitHandler<EndorsementInputs> = (data) => {
    // console.log("data", data);
    createEndorsementLink({
      variables: {
        fields: {
          message: data.message,
          nodesID: [data.node.value],
        },
      },
    });
  };
  const [inviteID, setInviteID] = useState<string>("");

  const [createEndorsementLink, {}] = useMutation(CREATE_ENDORSEMENT_LINK, {
    onCompleted: async ({ createEndorsementLink }) => {
      // console.log("createEndorsementLink", createEndorsementLink);
      setInviteID(createEndorsementLink._id);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const [showMessage, setShowMessage] = useState(false);

  const { data: nodesData } = useQuery(FIND_NODES, {
    variables: {
      fields: {
        node: "Skill",
      },
    },
  });

  const nodesValue = watch("node");

  const baseMessage = (skill: string) =>
    `I'm updating my professional profile and would love your endorsement on Eden for my proficiency in ${skill}. Your support means a lot, Thanks!`;

  const baseTwitterMessage = (skill: string) =>
    `I'm updating my professional profile and would love your endorsement on @joinedenxyz for my proficiency in ${skill}. Your support means a lot, Thanks!`;

  useEffect(() => {
    if (nodesValue?.label) {
      setShowMessage(true);
      setValue("message", baseMessage(nodesValue?.label));
    }
  }, [nodesValue?.label, setValue]);

  // console.log("nodesData", nodesData);
  let baseURL = "";

  // if localhost set base url to localhost
  if (process.env.NODE_ENV === "development") {
    baseURL = "http://localhost:3000";
  } else baseURL = `https://eden-alpha-develop.vercel.app`;

  const url = `${baseURL}/test/flow/endorsement/${inviteID}`;

  const text = baseMessage(nodesValue?.label) + `        ${url}`;

  const twitterText = baseTwitterMessage(nodesValue?.label) + `        ${url}`;

  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    twitterText
  )}`;

  const telegramShareUrl = `https://t.me/share/url?url=${encodeURIComponent(
    text
  )}`;

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(url);
    toast.success("Copied to clipboard!");
  };

  return (
    <GridLayout>
      <GridItemThree>
        <Card shadow className={"bg-white"}>
          <CandidateProfileCard member={currentUser} />
          <div className={`p-4 font-semibold uppercase text-neutral-800`}>
            Invite Friends Outside Eden
          </div>
        </Card>
      </GridItemThree>
      <GridItemNine>
        <Card
          shadow
          className={"scrollbar-hide h-85 overflow-scroll bg-white p-4"}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <div
              className={`text-center text-2xl font-medium uppercase text-neutral-700`}
            >
              {`Generate an Endorsement Link & Invite Anyone to Endorse You`}
            </div>
            <div className={`gap-4 sm:grid sm:grid-cols-3`}>
              <div className={`sm:col-span-2`}>
                <div className={`my-8`}>
                  <TextInputLabel>{`What skill would you like to be endorsed for?`}</TextInputLabel>
                  <div className={`my-4`}>
                    <Controller
                      control={control}
                      name={`node`}
                      render={({ field: { onChange } }) => (
                        <DropdownMenu
                          options={nodesData?.findNodes || []}
                          onSelect={onChange}
                        />
                      )}
                    />
                  </div>
                </div>
                {!nodesData?.findNodes && (
                  <div className={`my-8`}>
                    <div className={`text-center font-medium`}>
                      <div className={`text-neutral-700`}>
                        Loading Skills...
                      </div>
                      <div className={`text-neutral-700`}>
                        This may take a few seconds.
                      </div>
                    </div>
                  </div>
                )}

                {showMessage && (
                  <div className={`my-8`}>
                    <TextInputLabel
                      htmlFor={`message`}
                    >{`Copy & Paste this Message for your Endorser:`}</TextInputLabel>
                    <textarea
                      id={`message`}
                      className={`input-primary font-medium text-neutral-900`}
                      required
                      rows={8}
                      {...register(`message`)}
                    />
                  </div>
                )}
                <div className={`flex space-x-4`}>
                  {showMessage && (
                    <div className={`w-full`}>
                      <button
                        type={`submit`}
                        className={`rounded-full border-2 bg-[#D7D7FF] px-4 py-1 font-semibold uppercase text-neutral-700 hover:shadow-sm hover:shadow-indigo-300`}
                      >
                        Generate A Link
                      </button>
                    </div>
                  )}
                  {inviteID && (
                    <>
                      <div
                        className={`w-full truncate rounded-lg border border-zinc-400 px-2 py-1 font-medium text-zinc-700`}
                      >
                        {url}
                      </div>
                      <div>
                        <button
                          type={`button`}
                          className={`rounded-full border-2 bg-[#D7D7FF] px-4 py-1 font-semibold uppercase text-neutral-700 hover:shadow-sm hover:shadow-indigo-300`}
                          onClick={handleCopyToClipboard}
                        >
                          Copy
                        </button>
                      </div>
                    </>
                  )}
                </div>
                {inviteID && (
                  <div className={`my-6 grid grid-cols-2`}>
                    <div></div>
                    <div className={`flex space-x-6`}>
                      <a
                        href={twitterShareUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className=""
                        title="Share on Twitter"
                      >
                        <FaTwitter
                          size="1.5rem"
                          color="#1DA1F2"
                          className={`my-auto`}
                        />
                      </a>
                      {/* <a
                      href={twitterShareUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className=""
                      title="Share on Discord"
                    >
                      <FaDiscord
                        size="1.5rem"
                        color="#7289da"
                        className={`my-auto`}
                      />
                    </a> */}
                      <a
                        href={telegramShareUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className=""
                        title="Share on Telegram"
                      >
                        <FaTelegram
                          size="1.5rem"
                          color="#0088cc"
                          className={`my-auto`}
                        />
                      </a>
                    </div>
                  </div>
                )}
              </div>
              <div className={`mt-4 h-full border-l sm:col-span-1`}>
                <div className={`flex w-full justify-center`}>
                  <span
                    className={`bg-soilYellow/60 rounded-full px-4 py-1 text-xl font-semibold uppercase text-zinc-700`}
                  >
                    My Stats
                  </span>
                </div>
                <div
                  className={`my-2 grid grid-cols-2 text-center text-base font-semibold uppercase`}
                >
                  <div className={`grid-cols-1`}>
                    <div className={`flex justify-center text-zinc-400`}>
                      Total Income:
                    </div>
                    <div className={`flex justify-center text-zinc-800`}>
                      ${currentUser?.totalIncome || 0}
                    </div>
                  </div>
                  <div className={`grid-cols-1`}>
                    <div className={`flex justify-center text-zinc-400`}>
                      Credibility Level:
                    </div>
                    <div className={`flex justify-center text-zinc-800`}>
                      Legendary 🔥
                    </div>
                  </div>
                </div>
                <div
                  className={`my-2 grid grid-cols-2 text-center text-base font-semibold uppercase`}
                >
                  <div className={`grid-cols-1`}>
                    <div className={`flex justify-center text-zinc-400`}>
                      Endorsements:
                    </div>
                    <div className={`flex justify-center gap-4 text-zinc-800`}>
                      <span className={`flex`}>
                        <HiOutlineMail
                          className={`my-auto mr-1 h-4 text-zinc-400`}
                        />{" "}
                        {currentUser?.endorsementsReceive?.length || 0}
                      </span>
                      <span className={`flex`}>
                        <HiOutlineMailOpen
                          className={`my-auto mr-1 h-4 text-zinc-400`}
                        />{" "}
                        {currentUser?.endorsementsSend?.length || 0}
                      </span>
                    </div>
                  </div>
                  <div className={`grid-cols-1`}>
                    <div className={`flex justify-center text-zinc-400`}>
                      Reputation Score:
                    </div>
                    <div className={`text-soilGreen-900 flex justify-center`}>
                      {currentUser?.endorsementsSendStats?.reputation || 0}%
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
                        ~${currentUser?.endorsementsSendStats?.totalReward || 0}
                      </span>
                    </div>
                  </span>
                </div>
                <div className={`flex w-full justify-center`}>
                  <span
                    className={`bg-soilYellow/60 rounded-full px-4 py-1 text-lg font-semibold uppercase text-zinc-700`}
                  >
                    Endorsements in Eden
                  </span>
                </div>
                <div
                  className={`my-2 space-y-4 pl-4 text-sm font-medium uppercase text-zinc-700`}
                >
                  <li>
                    It matters who endorses you - people with more credibility
                    around the skill you want to be endorsed for means more
                    credibility around that skill for you (if you want to be
                    endorsed for ML its better to ask a senior ML engineer than
                    your mom)
                  </li>
                  <li>
                    Endorsers will receive a % of your future revenue - you can
                    set this % - the less you %, the less attractive your
                    profile will be - unless you are a high-earner of course
                  </li>
                </div>
              </div>
            </div>
          </form>
        </Card>
      </GridItemNine>
    </GridLayout>
  );
};

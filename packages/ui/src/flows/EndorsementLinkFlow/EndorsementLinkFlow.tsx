import { gql, useMutation, useQuery } from "@apollo/client";
import { UserContext } from "@eden/package-context";
import { FIND_NODES } from "@eden/package-graphql";
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
  FaDiscord,
  // FaGithub,
  // FaLinkedin,
  FaTelegram,
  FaTwitter,
} from "react-icons/fa";
import { toast } from "react-toastify";

import { DropdownMenu } from "./components/DropdownMenu";

const CREATE_ENDORSEMENT_LINK = gql`
  mutation ($fields: createEndorsementLinkInput) {
    createEndorsementLink(fields: $fields) {
      _id
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

  useEffect(() => {
    if (nodesValue?.label) {
      setShowMessage(true);
      setValue(
        "message",
        `I'm asking you to endorse me on Eden for my skills in ${nodesValue?.label}`
      );
    }
  }, [nodesValue?.label, setValue]);

  // console.log("nodesData", nodesData);
  let baseURL = "";
  // if localhost set base url to localhost

  if (process.env.NODE_ENV === "development") {
    baseURL = "http://localhost:3000";
  } else baseURL = `https://eden-alpha-develop.vercel.app`;

  const url = `${baseURL}/test/flow/endorsement/${inviteID}`;

  const text = `I'm asking you to endorse me on Eden. ${url}`;

  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    text
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
              Ask Anyone to Endorse You
            </div>
            <div className={`m-auto mt-8 max-w-xl`}>
              <div className={`my-8`}>
                <TextInputLabel>{`What do you want to be endorsed for?`}</TextInputLabel>
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

              {showMessage && (
                <div className={`my-8`}>
                  <TextInputLabel
                    htmlFor={`message`}
                  >{`Add a Message:`}</TextInputLabel>
                  <textarea
                    id={`message`}
                    className={`input-primary`}
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
                    <a
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
                    </a>
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
          </form>
        </Card>
      </GridItemNine>
    </GridLayout>
  );
};

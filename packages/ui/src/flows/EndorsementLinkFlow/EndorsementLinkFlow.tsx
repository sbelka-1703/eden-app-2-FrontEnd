import { useQuery } from "@apollo/client";
import { UserContext } from "@eden/package-context";
import { FIND_NODES } from "@eden/package-graphql";
import { Node } from "@eden/package-graphql/generated";
import {
  CandidateProfileCard,
  Card,
  GridItemNine,
  GridItemThree,
  GridLayout,
  TextInputLabel,
} from "@eden/package-ui";
import { useContext, useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  FaDiscord,
  // FaGithub,
  // FaLinkedin,
  FaTelegram,
  FaTwitter,
} from "react-icons/fa";

import { DropdownMenu } from "./components/DropdownMenu";

type EndorsementInputs = {
  node: Node;
  message: string;
};

export const EndorsementLinkFlow = ({}) => {
  const { currentUser } = useContext(UserContext);
  const { register, handleSubmit, control, watch } = useForm<EndorsementInputs>(
    {}
  );
  const onSubmit: SubmitHandler<EndorsementInputs> = (data) =>
    console.log(data);

  // const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const subscription = watch((data) => {
      console.log("WATCH ---- data", data.node);
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  const { data: nodesData } = useQuery(FIND_NODES, {
    variables: {
      fields: {
        node: "Skill",
      },
    },
  });

  console.log("nodesData", nodesData);

  // const text = `I'm asking you to endorse me for ${
  //   watch(`node`)?.name
  //   } on Eden. ${watch(`message`)}`;

  const text = `...`;

  const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    text
  )}`;

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
            <div className={`max-w-xl m-auto mt-8`}>
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
              <div className={`flex space-x-4`}>
                <div className={`w-full`}>
                  <button
                    type={`submit`}
                    className={`rounded-full border-2 bg-[#D7D7FF] py-1 px-4 font-semibold uppercase text-neutral-700 hover:shadow-sm hover:shadow-indigo-300`}
                  >
                    Generate A Link
                  </button>
                </div>

                <div
                  className={`border border-zinc-400 w-full px-2 py-1 rounded-lg`}
                ></div>
                <div>
                  <button
                    type={`button`}
                    className={`rounded-full border-2 bg-[#D7D7FF] py-1 px-4 font-semibold uppercase text-neutral-700 hover:shadow-sm hover:shadow-indigo-300`}
                  >
                    Copy
                  </button>
                </div>
              </div>
              <div className={`grid grid-cols-2 my-6`}>
                <div></div>
                <div className={`flex space-x-6`}>
                  <a
                    href={shareUrl}
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
                    href={shareUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className=""
                    title="Share on Twitter"
                  >
                    <FaDiscord
                      size="1.5rem"
                      color="#7289da"
                      className={`my-auto`}
                    />
                  </a>
                  <a
                    href={shareUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className=""
                    title="Share on Twitter"
                  >
                    <FaTelegram
                      size="1.5rem"
                      color="#0088cc"
                      className={`my-auto`}
                    />
                  </a>
                </div>
              </div>
            </div>
          </form>
        </Card>
      </GridItemNine>
    </GridLayout>
  );
};

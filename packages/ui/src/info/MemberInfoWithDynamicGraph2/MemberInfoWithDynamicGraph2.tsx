import { gql, useQuery } from "@apollo/client";
import { Maybe, Members } from "@eden/package-graphql/generated";
import {
  // MemberGraph,
  DynamicSearchMemberGraph,
  SocialMediaComp,
  TextLabel1,
  UserBackground,
  UserWithDescription,
} from "@eden/package-ui";
import { useState } from "react";

export interface IMemberInfoWithDynamicGraph2Props {
  member?: Maybe<Members>;
  percentage?: number;
  loading?: boolean;
  hasGraph?: boolean;
  nodesID?: any;
  conversation?: any;
}

const EDEN_GPT_SUMMARY_PROFILE = gql`
  query ($fields: edenGPTsummaryProfileInput!) {
    edenGPTsummaryProfile(fields: $fields) {
      reply
    }
  }
`;

// const HighlightText = ({ text }) => {
//   // const highlightStyle = "bg-yellow-200 font-semibold";
//   // const highlightStyle = "bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white px-1 py-0.5 rounded-md shadow-md";
//   const highlightStyle =
//     "bg-blue-200 text-blue-800 px-1 py-0.5 rounded-md shadow-sm";

//   const parts = text.split("*");
//   const highlightedText = parts.map((part: string, index: number) => {
//     if (index % 2 === 1) {
//       return (
//         <span key={index} className={highlightStyle}>
//           {part}
//         </span>
//       );
//     } else {
//       return part;
//     }
//   });

//   return <p>{highlightedText}</p>;
// };
interface HighlightTextProps {
  text: string | null;
}

const HighlightText = ({ text }: HighlightTextProps) => {
  // const highlightStyle =
  //   "bg-blue-200 text-blue-800 px-1 py-0.5 rounded-md shadow-sm";
  const bulletPoint = (
    <span className="mx-2 text-xl font-bold text-blue-500">•</span>
  );

  if (text == null) text = "";

  // const parts = text.replace(/^\n+/g, "").split(/\n-+/);
  const parts = text.replace(/^\n+/g, "").split(/\n\s*[•-]\s*/);

  for (let i = 0; i < parts.length; i++) {
    parts[i] = parts[i].replace(/-/g, "").replace(/•/g, "");
  }

  // parts = parts.replace(/-/g, "");
  const highlightedText = parts.map((part: string, index: number) => {
    return (
      <span key={index}>
        {bulletPoint}
        <span>{part.trim()}</span>
        <br />
      </span>
    );
  });

  return <p>{highlightedText}</p>;
};

export const MemberInfoWithDynamicGraph2 = ({
  member,
  percentage,
  loading = false,
  nodesID,
  conversation,
}: IMemberInfoWithDynamicGraph2Props) => {
  const [experienceOpen, setExperienceOpen] = useState<number | null>(null);

  // console.log("nodesID -- -2--2-2 = ", nodesID);

  const [edenGPTsummary, setEdenGPTsummary] = useState<string | null>(null);
  const [loadingGPTsummary, setLoadingGPTsummary] = useState<boolean>(true);

  const {} = useQuery(EDEN_GPT_SUMMARY_PROFILE, {
    variables: {
      fields: {
        conversation: conversation,
        memberID: member?._id,
      },
    },
    // skip: nodesID == undefined,
    skip: !member?._id || !conversation,
    // skip: selectedOption !== "Option 8",
    onCompleted: (data) => {
      if (data) {
        setEdenGPTsummary(data?.edenGPTsummaryProfile?.reply);
        setLoadingGPTsummary(false);
        console.log(
          "data.edenGPTsummaryProfile = ",
          data.edenGPTsummaryProfile
        );
        // setDataGraphAPI(data.dynamicSearchToMemberGraphGPT);
      }
    },
  });

  if (!member) return null;

  // console.log("member = ", member);

  return (
    <div>
      <div className="mb-10 sm:grid sm:grid-cols-6">
        <div className="flex flex-col items-center justify-end sm:col-span-2">
          <p className="border-b border-slate-200 text-center">
            <span className="text-2xl">$4200</span>
          </p>
          <p className="text-center text-sm text-slate-400">Eden lvl3</p>
        </div>
        <div className="sm:col-span-2">
          <UserWithDescription member={member} />
        </div>
        <div className="flex flex-col items-center justify-end sm:col-span-2">
          <p className="border-b border-slate-200 text-center text-sm">
            <span className="text-2xl">10</span>
            <br />
            completed opportunities
          </p>
          <p className="text-center text-sm text-slate-400">💎 Eden Native</p>
        </div>
      </div>
      <div className="mb-8 sm:grid-cols-6">
        <div className="my-4 flex flex-col items-start justify-center rounded-xl bg-cyan-50 p-4 pt-3 sm:col-span-4 sm:my-0">
          <TextLabel1>
            🪄 Why {member.discordName} is Perfect for you? 🪄{" "}
          </TextLabel1>
          {!loadingGPTsummary ? (
            <>
              <p className="text-soilBody font-Inter font-normal">
                {/* {edenGPTsummary} */}
                <HighlightText text={edenGPTsummary || ""} />
              </p>
            </>
          ) : (
            <>
              <div className="flex w-full animate-pulse space-x-4">
                <div className="flex-1 space-y-2 py-1">
                  <div className="h-3 rounded bg-slate-200"></div>
                  <div className="h-3 rounded bg-slate-200"></div>
                  <div className="h-3 rounded bg-slate-200"></div>
                  <div className="h-3 rounded bg-slate-200"></div>
                </div>
              </div>
            </>
          )}
        </div>
        {/* <div></div>
        {member?.links && member?.links.length > 0 && (
          <SocialMediaComp links={member?.links} />
        )} */}
      </div>

      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-6">
        <div className="sm:col-span-4 sm:my-0">
          {!!member?.bio && <TextLabel1>🪪 Short bio</TextLabel1>}
          {!loading ? (
            <p className="text-soilBody font-Inter whitespace-pre-wrap font-normal">
              {member?.bio}
            </p>
          ) : (
            <div className="flex w-full animate-pulse space-x-4">
              <div className="flex-1 space-y-2 py-1">
                <div className="h-3 rounded bg-slate-200"></div>
                <div className="h-3 rounded bg-slate-200"></div>
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-col items-center sm:col-span-2 sm:my-0">
          <section className="mb-4">
            <p className="text-center">
              <TextLabel1>⚡️ Match</TextLabel1>
            </p>
            <p className="text-[62px] font-bold leading-none text-[#cb10ff]">
              {percentage}%
            </p>
          </section>
          <section className="mb-4">
            <p className="text-center">
              <TextLabel1>💰 Hourly rate</TextLabel1>
            </p>
            <p className="text-center">
              <span className="text-2xl font-bold text-[#fcba03]">
                ${percentage}
              </span>{" "}
              per hour
            </p>
            <p className="text-center text-sm text-slate-400">
              Base rate + tax
            </p>
          </section>
        </div>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-6">
        {/* MEMEBER.ENDORSEMENT NO LONGER EXISTS */}

        <div className="sm:col-span-4 sm:my-0">
          {member?.previousProjects && member?.previousProjects.length && (
            <UserBackground
              background={member?.previousProjects || []}
              setExperienceOpen={setExperienceOpen!}
              experienceOpen={experienceOpen!}
            />
          )}
        </div>
        <div className="flex flex-col items-center sm:col-span-2 sm:my-0">
          <section className="mb-4">
            {member?.links && member?.links.length > 0 && (
              <SocialMediaComp links={member?.links} />
            )}
          </section>
          <section>
            <TextLabel1>🌍 Timezone</TextLabel1>
            <p className="text-center font-bold text-slate-600">UTC+1</p>
          </section>
        </div>
      </div>

      <div className="mt-3 h-[360px] w-full">
        <DynamicSearchMemberGraph
          memberID={member._id!}
          nodesID={nodesID}
          disableZoom={true}
          graphType={"KG_AI2"}
          // graphType={"KG_AI"}
          // zoomGraph={1.1}
        />
      </div>
    </div>
  );
};

import { Maybe, Members } from "@eden/package-graphql/generated";
import {
  Badge,
  // MemberGraph,
  DynamicSearchMemberGraph,
  IPREFERENCES_TITLE,
  NodeList,
  PREFERENCES_TITLE,
  SocialMediaComp,
  TextLabel1,
  UserBackground,
  UserWithDescription,
} from "@eden/package-ui";
import { useState } from "react";

export interface IMemberInfoWithDynamicGraphProps {
  member?: Maybe<Members>;
  percentage?: number;
  loading?: boolean;
  hasGraph?: boolean;
  nodesID?: any;
}

export const MemberInfoWithDynamicGraph = ({
  member,
  percentage,
  loading = false,
  nodesID,
}: IMemberInfoWithDynamicGraphProps) => {
  const [experienceOpen, setExperienceOpen] = useState<number | null>(null);

  const subExpertise = member?.nodes?.filter(
    (node) => node?.nodeData?.node === "sub_expertise"
  );

  const projectType = member?.nodes?.filter(
    (node) => node?.nodeData?.node === "sub_typeProject"
  );

  const selectedPreferences = member?.preferences
    ? (Object.keys(member?.preferences) as [keyof IPREFERENCES_TITLE]).filter(
        (key) =>
          member.preferences![key]?.interestedMatch && key.includes("find")
      )
    : null;

  if (!member) return null;

  return (
    <div>
      <UserWithDescription member={member} percentage={percentage} />

      <div className="h-[280px] w-full">
        <DynamicSearchMemberGraph
          memberID={member._id!}
          nodesID={nodesID}
          disableZoom={true}
        />
      </div>

      <div className="mb-4 grid grid-cols-1 sm:grid-cols-5">
        <div className="my-4 flex flex-col items-start justify-center sm:col-span-3 sm:my-0">
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
        <div></div>
        {member?.links && member?.links.length > 0 && (
          <SocialMediaComp links={member?.links} />
        )}
      </div>
      {selectedPreferences && (
        <div className="mb-4">
          <TextLabel1>🔎 PREFERENCES</TextLabel1>
          <div>
            {selectedPreferences.map(
              (preference: keyof IPREFERENCES_TITLE, index: number) => (
                <Badge
                  key={index}
                  text={PREFERENCES_TITLE[preference]}
                  colorRGB={`255,255,167`}
                  className={`font-Inter text-sm`}
                  closeButton={false}
                  cutText={16}
                />
              )
            )}
          </div>
        </div>
      )}
      <div className={`grid grid-cols-1 gap-4 md:grid-cols-2`}>
        <div className={`flex flex-col`}>
          <NodeList
            label={`EXPERTISE`}
            nodes={subExpertise}
            colorRGB={`235,225,255`}
          />
        </div>
        <div className={`flex flex-col`}>
          <NodeList
            label={`PREFERRED PROJECTS`}
            nodes={projectType}
            colorRGB={`209,247,196`}
          />
        </div>
      </div>
      {((member?.previousProjects && member?.previousProjects.length) ||
        (member?.endorsements && member?.endorsements.length > 0)) && (
        <div className={`my-4`}>
          <UserBackground
            background={member?.previousProjects || []}
            initialEndorsements={member?.endorsements || []}
            setExperienceOpen={setExperienceOpen!}
            experienceOpen={experienceOpen!}
          />
        </div>
      )}
    </div>
  );
};
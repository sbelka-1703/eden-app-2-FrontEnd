import { Maybe, Members } from "@eden/package-graphql/generated";
import {
  NodeList,
  SocialMediaComp,
  TextHeading3,
  UserBackground,
  UserWithDescription,
} from "@eden/package-ui";
import { useState } from "react";

export interface IMemberInfoProps {
  member?: Maybe<Members>;
  percentage?: number;
  loading?: boolean;
}

export const MemberInfo = ({
  member,
  percentage,
  loading = false,
}: IMemberInfoProps) => {
  const [experienceOpen, setExperienceOpen] = useState<number | null>(null);

  if (!member) return null;

  const subExpertise = member?.nodes?.filter(
    (node) => node?.nodeData?.node === "sub_expertise"
  );

  const projectType = member?.nodes?.filter(
    (node) => node?.nodeData?.node === "sub_typeProject"
  );

  return (
    <div>
      <UserWithDescription member={member} percentage={percentage} />

      <div className="mb-4 grid grid-cols-1 sm:grid-cols-5">
        <div className="my-4 flex flex-col items-start justify-center sm:col-span-3 sm:my-0">
          <TextHeading3
            style={{ fontWeight: 700 }}
            className="mb-2 text-sm uppercase text-gray-500"
          >
            🪪 Short bio
          </TextHeading3>
          {!loading ? (
            <p className="text-soilBody font-Inter font-normal">
              {member?.bio}
            </p>
          ) : (
            <div className="animate-pulse flex space-x-4 w-full">
              <div className="flex-1 space-y-2 py-1">
                <div className="h-3 bg-slate-200 rounded"></div>
                <div className="h-3 bg-slate-200 rounded"></div>
              </div>
            </div>
          )}
        </div>
        <div></div>
        <SocialMediaComp links={member?.links} />
      </div>
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
      <div className={`my-4`}>
        <UserBackground
          background={member?.previusProjects || []}
          initialEndorsements={member?.endorsements || []}
          setExperienceOpen={setExperienceOpen!}
          experienceOpen={experienceOpen!}
        />
      </div>
    </div>
  );
};

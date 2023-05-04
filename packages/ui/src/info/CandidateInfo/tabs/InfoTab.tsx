import { Maybe, Members } from "@eden/package-graphql/generated";
import { SocialMediaComp, TextLabel1, UserBackground } from "@eden/package-ui";
import { useState } from "react";

interface Props {
  member?: Maybe<Members>;
  percentage?: number;
  loading?: boolean;
}

export const InfoTab = ({ member, loading }: Props) => {
  const [experienceOpen, setExperienceOpen] = useState<number | null>(null);

  return (
    <>
      <div className="mb-4 grid grid-cols-2 ">
        <div className="col-1 p-2">
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

          {/* BACKGROUND */}
          {member?.previousProjects && member?.previousProjects.length && (
            <div className={`my-4`}>
              <UserBackground
                background={member?.previousProjects || []}
                // initialEndorsements={member?.endorsements || []}
                setExperienceOpen={setExperienceOpen!}
                experienceOpen={experienceOpen!}
              />
            </div>
          )}
        </div>
        <div className="col-2 p-2">
          <div className="my-4 flex flex-col items-start justify-center sm:col-span-2 sm:my-0">
            <div></div>
            {member?.links && member?.links.length > 0 && (
              <SocialMediaComp links={member?.links} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

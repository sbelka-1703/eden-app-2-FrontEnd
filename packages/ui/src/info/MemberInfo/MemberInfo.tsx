import { Maybe, Members } from "@eden/package-graphql/generated";
import {
  Badge,
  SocialMediaComp,
  TextHeading3,
  UserBackground,
  UserWithDescription,
} from "@eden/package-ui";

// import { round } from "../../../utils";

export interface IMemberInfoProps {
  member?: Maybe<Members>;
  percentage?: number;
  experienceOpen?: number | null;
  // eslint-disable-next-line no-unused-vars
  setExperienceOpen?: (val: number | null) => void;
}

export const MemberInfo = ({
  member,
  percentage,
  experienceOpen,
  setExperienceOpen,
}: IMemberInfoProps) => {
  if (!member) return null;

  return (
    <div>
      <UserWithDescription member={member} percentage={percentage} />
      <div className="mb-4 grid grid-cols-1 sm:grid-cols-5">
        <div className="sm:col-span-3 my-4 sm:my-0 flex flex-col items-start justify-center">
          <TextHeading3
            style={{ fontWeight: 700 }}
            className="mb-2 text-sm uppercase text-gray-500"
          >
            🪪 Short bio
          </TextHeading3>
          <p className="text-soilBody font-Inter font-normal">{member?.bio}</p>
        </div>
        <div></div>
        <SocialMediaComp links={member?.links} />
      </div>
      <div>
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-4`}>
          <div className={`flex flex-col`}>
            <div className="space-y-2 py-1">
              <TextHeading3
                style={{ fontWeight: 700 }}
                className="mb-2 text-sm uppercase text-gray-500"
              >
                SKILLS
              </TextHeading3>
            </div>
            <div>
              {member?.nodes?.map((item, index) => {
                if (item?.nodeData?.node == "sub_expertise") {
                  return (
                    <Badge
                      key={index}
                      text={item?.nodeData?.name || ""}
                      colorRGB={`235,225,255`}
                      className={`font-Inter text-sm`}
                      cutText={16}
                    />
                  );
                }
              })}
            </div>
          </div>
          <div className={`flex flex-col`}>
            <div className="space-y-2 py-1">
              <TextHeading3
                style={{ fontWeight: 700 }}
                className="mb-2 text-sm uppercase text-gray-500"
              >
                PREFERRED PROJECTS
              </TextHeading3>
            </div>
            <div>
              {member?.nodes?.map((item, index) => {
                if (item?.nodeData?.node == "sub_typeProject") {
                  return (
                    <Badge
                      key={index}
                      text={item?.nodeData?.name || ""}
                      colorRGB={`209,247,196`}
                      className={`font-Inter text-sm`}
                      cutText={16}
                    />
                  );
                }
              })}
            </div>
          </div>
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

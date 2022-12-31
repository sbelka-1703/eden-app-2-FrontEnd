import { useQuery } from "@apollo/client";
import { FIND_MEMBER_INFO } from "@eden/package-graphql";
import { Maybe, Members, NodesType } from "@eden/package-graphql/generated";
import {
  NodeList,
  SocialMediaComp,
  TextHeading3,
  UserBackground,
  UserWithDescription,
} from "@eden/package-ui";

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
  const { data: dataMemberInfo } = useQuery(FIND_MEMBER_INFO, {
    variables: {
      fields: {
        _id: member?._id,
      },
    },
    skip: !member?._id,
    context: { serviceName: "soilservice" },
  });

  const findMember = dataMemberInfo?.findMember;

  if (!member) return null;

  const subExpertise = findMember?.nodes?.filter(
    (node: NodesType) => node?.nodeData?.node === "sub_expertise"
  );

  const projectType = findMember?.nodes?.filter(
    (node: NodesType) => node?.nodeData?.node === "sub_typeProject"
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
          <p className="text-soilBody font-Inter font-normal">
            {findMember?.bio}
          </p>
        </div>
        <div></div>
        <SocialMediaComp links={findMember?.links} />
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
          background={findMember?.previusProjects || []}
          initialEndorsements={findMember?.endorsements || []}
          setExperienceOpen={setExperienceOpen!}
          experienceOpen={experienceOpen!}
        />
      </div>
    </div>
  );
};

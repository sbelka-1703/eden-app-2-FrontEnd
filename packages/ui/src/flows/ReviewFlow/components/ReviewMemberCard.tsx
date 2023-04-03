import { Members, NodesType, Project } from "@eden/package-graphql/generated";
import { Avatar, Card, NodeList, TextBody, TextLabel2 } from "@eden/package-ui";
import { useCallback } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";

import { ReviewButton } from "./";

interface IReviewMemberCardProps {
  member?: Members;
  project?: Project;
  topSkills?: NodesType[];
  collaboration?: any;
  // eslint-disable-next-line no-unused-vars
  onSelected: (member: Members, project: Project) => void;
}

export const ReviewMemberCard = ({
  member,
  project,
  topSkills,
  collaboration,
  onSelected,
}: IReviewMemberCardProps) => {
  const handleSelectMember = useCallback(() => {
    if (member && project) onSelected(member, project);
  }, [member, project, onSelected]);

  // console.log("collaboration", collaboration);
  // console.log("project", project);
  if (!member) return null;
  return (
    <Card shadow border className={`relative p-4`}>
      <div className={`mb-8 grid grid-cols-2 gap-4`}>
        <div className={`col-span-1`}>
          <div className={`flex	items-center gap-2`}>
            <div>
              <Avatar src={member?.discordAvatar!} size="md" />
            </div>
            <div>
              <div>
                {member?.discordName && (
                  <span className="text-lg font-medium tracking-wide text-neutral-600">
                    @{member?.discordName}
                  </span>
                )}
              </div>
              <div className="text-xs font-medium uppercase tracking-wide text-neutral-500">
                {member?.memberRole?.title}
              </div>
            </div>
          </div>

          <div>
            <TextLabel2>Top Skills:</TextLabel2>
            <NodeList nodes={topSkills} colorRGB={`215,215,255`} />
          </div>
          <div>
            <TextLabel2>Collaborated On:</TextLabel2>
            <TextBody>{collaboration?.collaboaratedOn}</TextBody>
          </div>
        </div>
        <div className={`col-span-1`}>
          <div className={`flex	items-center gap-2`}>
            <div>
              <Avatar isProject size="md" />
            </div>
            <div
              className={`text-lg font-medium tracking-wide text-neutral-600`}
            >
              {project?.title}
            </div>
          </div>
          <div className="mb-2 text-xs font-medium uppercase tracking-wide text-neutral-500">
            {project?.descriptionOneLine}
          </div>
          <TextLabel2>Main Tasks:</TextLabel2>
          {collaboration?.tasks?.map((task: string, index: number) => (
            <li key={index} className={`text-sm font-medium text-neutral-700`}>
              {task}
            </li>
          ))}
          <div className={`mt-2 grid grid-cols-2`}>
            <div className={`col-span-1`}>
              <TextLabel2>Pow:</TextLabel2>
              <a
                href={`https://app.dework.xyz/developer-dao/frontend2web3?taskId=f6182f3e-1dcd-4c5a-a6cc-99bae0b4a162`}
                target="_blank"
                rel="noreferrer"
              >
                <FaExternalLinkAlt
                  className={`h-4 w-4 text-neutral-600 hover:text-neutral-700`}
                />
              </a>
            </div>
            <div className={`col-span-1`}>
              <TextLabel2>Timeline:</TextLabel2>

              <TextBody>{collaboration?.timeline}</TextBody>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`absolute inset-x-0 bottom-0 mb-2 mt-8 flex justify-center`}
      >
        <ReviewButton type={`button`} onClick={handleSelectMember} />
      </div>
    </Card>
  );
};

import { Maybe, ProjectMemberType } from "@eden/package-graphql/generated";
import { Avatar, Card, EmojiSelector, TextHeading3 } from "@eden/package-ui";

export interface ReviewCardProps {
  project?: Maybe<ProjectMemberType>;
}

export const ReviewCard = ({ project }: ReviewCardProps) => {
  return (
    <>
      <Card shadow className={`h-60 overflow-scroll `}>
        <div className="mb-2 flex w-full content-center items-center justify-between">
          <div className="flex content-center items-center justify-start	p-3">
            <div>
              <Avatar
                size="lg"
                isProject
                emoji={project?.info?.emoji as string}
                backColorEmoji={project?.info?.backColorEmoji as string}
              />
            </div>
            <div className="ml-4">
              {project?.info?.title && (
                <TextHeading3>@{project?.info?.title}</TextHeading3>
              )}
              <TextHeading3 className="text-gray-400">
                {project?.role?.title}
              </TextHeading3>
            </div>
          </div>
          <div className="flex flex-row p-3">
            <div className="mx-3 rounded-full bg-emerald-300">
              <EmojiSelector isDisabled bgColor="" emoji="✨" size={40} />
            </div>
            <div className="mx-3 rounded-full	bg-pink-500">
              <EmojiSelector isDisabled bgColor="" emoji="🚀" size={40} />
            </div>
          </div>
        </div>
        <div className="mb-4 px-6 text-left text-lg font-normal">
          {project?.role?.description}
        </div>
      </Card>
    </>
  );
};

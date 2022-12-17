import { Members } from "@eden/package-graphql/generated";
import {
  Avatar,
  Badge,
  Card,
  EmojiSelector,
  TextHeading3,
} from "@eden/package-ui";

interface ReviewProps {
  _id: string;
  member: Members;
  text: string;
}

export interface ReviewCardProps {
  review?: ReviewProps;
}

export const ReviewCard = ({ review }: ReviewCardProps) => {
  return (
    <>
      <Card shadow className={`h-60`}>
        <div className="mb-2 flex w-full content-center items-center justify-between">
          <div className="flex content-center items-center justify-start	p-3">
            <div>
              <Avatar size="md" src={review?.member?.discordAvatar || ""} />
            </div>
            <div className="ml-4">
              <TextHeading3>@{review?.member?.discordName}</TextHeading3>
              <TextHeading3 className="text-gray-400">
                {review?.member?.memberRole?.title}
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
        <div className="scrollbar-hide h-20 overflow-scroll px-6 text-left text-lg font-normal">
          {review?.text}
        </div>
        <div className="mt-2 px-6 text-left text-lg font-normal">
          <Badge
            text={`TRST $ ${400}`}
            colorRGB="159, 90, 253"
            className="text-sm text-white"
            cutText={10}
          />
          {/* {project?.role?.skills &&
            project?.role?.skills.map((skill, index) => {
              return (
                <Badge
                  key={index}
                  text={skill?.comment || ""}
                  colorRGB="159, 90, 253"
                  className="text-sm text-white"
                  cutText={10}
                />
              );
            })} */}
        </div>
      </Card>
    </>
  );
};

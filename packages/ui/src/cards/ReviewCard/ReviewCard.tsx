import { Maybe, ProjectMemberType } from "@eden/package-graphql/generated";
import {
  Avatar,
  Badge,
  Card,
  EmojiSelector,
  TextHeading3,
} from "@eden/package-ui";

export interface ReviewCardProps {
  project?: Maybe<ProjectMemberType>;
}

export const ReviewCard = ({ project }: ReviewCardProps) => {
  return (
    <>
      <Card shadow className={`h-60`}>
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
        <div className="h-20 overflow-scroll px-6 text-left text-lg font-normal">
          {/* {project?.role?.description} */}
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
          volutpat nulla eget diam sagittis commodo. Aenean posuere in sem
          molestie accumsan. Curabitur gravida nibh lorem, congue tincidunt
          libero maximus at. Pellentesque nec orci a mauris varius facilisis sed
          eget velit. Aliquam vitae ultrices lorem. Phasellus a ante purus.
          Suspendisse dignissim odio vitae vehicula dictum. Aliquam vehicula
          tristique risus, scelerisque imperdiet urna fringilla at. Integer
          laoreet dolor sapien, sed ultricies quam egestas sed. Aenean congue
          purus non hendrerit elementum. Curabitur suscipit feugiat purus, non
          molestie ligula suscipit quis. Orci varius natoque penatibus et magnis
          dis parturient montes, nascetur ridiculus mus.
        </div>
        <div className="mt-2 px-6 text-left text-lg font-normal">
          <Badge
            text={`TRST $ ${400}`}
            colorRGB="159, 90, 253"
            className="text-xs text-white"
            cutText={10}
          />
          {project?.role?.skills.map((skill, index) => {
            return (
              <Badge
                key={index}
                text={skill?.comment}
                colorRGB="159, 90, 253"
                className="text-xs text-white"
                cutText={10}
              />
            );
          })}
        </div>
      </Card>
    </>
  );
};

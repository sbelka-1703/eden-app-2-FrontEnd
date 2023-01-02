import { Rooms } from "@eden/package-graphql/generated";
import { Avatar, Card, TextHeading2 } from "@eden/package-ui";

export interface IOnboardRoomCardProps {
  room?: Rooms;
}

export const OnboardRoomCard = ({ room }: IOnboardRoomCardProps) => {
  if (!room) return null;
  return (
    <Card shadow className={`bg-white p-4`}>
      <div className={`flex`}>
        <div className={``}>
          <Avatar isProject size={`sm`} src={room?.avatar || ""} />
        </div>
        <div className={`my-auto ml-4`}>
          <TextHeading2>{room?.name}</TextHeading2>
        </div>
      </div>
      <div className={`mt-2 flex`}>
        <div>📍</div>
        <div
          className={`text-darkGreen font-poppins xl:text-md ml-4 space-y-4 text-xs sm:text-sm`}
        >
          <p>{room?.description}</p>
        </div>
      </div>
    </Card>
  );
};

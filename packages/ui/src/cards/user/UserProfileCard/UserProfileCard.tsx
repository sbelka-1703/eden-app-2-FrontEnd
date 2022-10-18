import { UserContext } from "@eden/package-context";
import { Avatar, Card, TextLabel } from "@eden/package-ui";
import { useContext } from "react";

export interface IUserProfileCardProps {}

export const UserProfileCard = ({}: IUserProfileCardProps) => {
  const { currentUser } = useContext(UserContext);

  return (
    <Card className="w-full bg-white p-4">
      <div className={``}>
        <div className={` font-poppins text-xl font-medium`}>Your Profile</div>
        <div className={`my-3 flex`}>
          <div>
            <Avatar src={currentUser?.discordAvatar || ""} size="md" />
          </div>
          <div className={`font-poppins pl-4 text-2xl font-medium`}>
            <div>
              @{currentUser?.discordName}
              <TextLabel> #{currentUser?.discriminator}</TextLabel>
            </div>
            <div className={`font-Inter text-xl text-zinc-500`}>
              {currentUser?.memberRole?.title}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

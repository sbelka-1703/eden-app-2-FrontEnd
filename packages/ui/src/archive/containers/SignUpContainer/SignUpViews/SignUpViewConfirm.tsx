import { SignUpContext, UserContext } from "@eden/package-context";
import { Avatar, BioComponent, SocialMediaComp } from "@eden/package-ui";
import { useContext } from "react";

export const SignUpViewConfirm = () => {
  const { currentUser } = useContext(UserContext);
  const { profileBio, contentMostProud, contentShowcaseAbility } =
    useContext(SignUpContext);

  return (
    <div className={`p-6`}>
      <div className={`mt-2 flex justify-center`}>
        <div>
          <Avatar src={`${currentUser?.discordAvatar}`} size={`lg`} />
          <div className={`font-Inter text-darkGreen text-center`}>
            @{currentUser?.discordName}
          </div>
        </div>
      </div>
      <div className={`grid grid-cols-12 space-x-4 pt-4`}>
        <div className={`col-span-8`}>
          <BioComponent title={`BIO`} description={profileBio} />
        </div>
        <div className={`col-span-4`}>
          <SocialMediaComp />
        </div>
      </div>
      <div className={`mt-4 grid grid-cols-12 space-x-4`}>
        <div className={`col-span-6 space-y-4`}>
          <BioComponent
            title={`What project are you most proud of?`}
            description={contentMostProud}
          />
        </div>
        <div className={`col-span-6 space-y-4`}>
          <BioComponent
            title={`What piece of work really showcases your abilities?`}
            description={contentShowcaseAbility}
          />
        </div>
      </div>
    </div>
  );
};

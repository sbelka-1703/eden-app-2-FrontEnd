import { SignUpContext, UserContext } from "@context/eden";
import { useContext } from "react";
import { Avatar, TextArea } from "ui";

export const SignUpViewBio = () => {
  const { currentUser } = useContext(UserContext);

  const { profileBio, setProfileBio } = useContext(SignUpContext);

  return (
    <div className={`p-6`}>
      <div
        className={`font-poppins text-darkGreen text-center text-2xl font-medium`}
      >
        Fill out your Eden Profile
      </div>
      <div className={`mt-8 flex justify-center`}>
        <div>
          <Avatar src={`${currentUser?.discordAvatar}`} size={`lg`} />
          <div className={`font-Inter text-darkGreen text-center`}>
            @{currentUser?.discordName}
          </div>
        </div>
      </div>
      <div className={`font-poppins mt-8`}>
        <div>What would you like people to know about you?</div>
        <div className={`mb-4`}>This is your chance to sell yourself!</div>
        <TextArea
          placeholder={`Start typing here`}
          rows={8}
          value={profileBio}
          onChange={(e) => setProfileBio(e.target.value)}
        />
      </div>
    </div>
  );
};

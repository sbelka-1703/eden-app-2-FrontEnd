import { SignUpContext } from "@context/eden";
import { useContext } from "react";
import { TextField } from "ui";

export const SignUpViewBio = () => {
  const { profileBio, setProfileBio } = useContext(SignUpContext);

  return (
    <div className={`p-6`}>
      <h1>SignUpViewBio</h1>
      <TextField
        label="Bio"
        value={profileBio}
        onChange={(e) => setProfileBio(e.target.value)}
      />
    </div>
  );
};

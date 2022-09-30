import { SignUpContext } from "@eden/package-context";
import { useContext } from "react";
import { TextArea } from "ui";

export const SignUpViewShare = () => {
  const {
    contentMostProud,
    setContentMostProud,
    contentShowcaseAbility,
    setContentShowcaseAbility,
  } = useContext(SignUpContext);

  return (
    <div className={`py-6 px-12`}>
      <div
        className={`font-poppins text-darkGreen text-center text-2xl font-medium`}
      >
        SHARE YOUR THOUGHTS
      </div>
      <div className={`font-poppins mt-8`}>
        <div>What Project are you most proud of?</div>

        <TextArea
          placeholder={`Start typing here`}
          rows={6}
          value={contentMostProud}
          onChange={(e) => setContentMostProud(e.target.value)}
        />
      </div>
      <div className={`font-poppins mt-8`}>
        <div>What piece of work really showcases your abilities?</div>

        <TextArea
          placeholder={`Start typing here`}
          rows={6}
          value={contentShowcaseAbility}
          onChange={(e) => setContentShowcaseAbility(e.target.value)}
        />
      </div>
    </div>
  );
};

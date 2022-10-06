import { CategorySearchSkill } from "@eden/package-ui/src";
import { useState } from "react";

const SkillTest = () => {
  const [skills, setSkills] = useState([]);

  return (
    <div>
      <CategorySearchSkill
        skills={skills}
        setSkills={setSkills}
        levels={[
          {
            title: "learning",
            level: "learning",
          },
          {
            title: "Skilled",
            level: "mid",
          },
        ]}
      />
    </div>
  );
};

export default SkillTest;

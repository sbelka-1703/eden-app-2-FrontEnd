import React, { useState } from "react";
import { CategorySearchSkill } from "ui";

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

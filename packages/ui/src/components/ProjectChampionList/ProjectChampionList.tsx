import "./style.css";

import { UserContext } from "@eden/package-context";
import { Card, NumberCircle, TextBody, TextHeading3 } from "@eden/package-ui";
import { useContext } from "react";

export const ProjectChampionList = () => {
  const { currentUser } = useContext(UserContext);
  const champions = currentUser?.projects?.filter(
    (project) => project?.champion
  );

  console.info({ champions });

  console.info({ currentUser });
  return (
    <div>
      {champions?.map((item, index) => (
        <Card
          key={index}
          className={`bg-gray-100 p-6 mb-${
            index === champions.length - 1 ? 0 : 4
          }`}
        >
          <div className="flex items-center">
            <div
              className="flex h-24 w-24 items-center justify-center rounded-full text-5xl"
              style={{ backgroundColor: "red" }}
            >
              👨‍🎨
            </div>
            <div className="ml-8 flex flex-col justify-between">
              <TextHeading3>School of Code</TextHeading3>
              <TextBody className="mb-2 flex">
                New applicants:
                <NumberCircle
                  value={10}
                  color="#88A9FF"
                  className="ml-2 inline-block h-7 w-7 font-semibold text-white"
                />
              </TextBody>
              <TextBody className="flex">
                New applicants:
                <NumberCircle
                  value={10}
                  color="#88A9FF"
                  className="ml-2 inline-block h-7 w-7 font-semibold text-white"
                />
              </TextBody>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

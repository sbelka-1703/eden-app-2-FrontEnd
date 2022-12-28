// import { LinkType, Maybe, Members } from "@eden/package-graphql/generated";
import { UserContext } from "@eden/package-context";
import { Project } from "@eden/package-graphql/generated";
import {
  Avatar,
  Badge,
  Button,
  Card,
  // OpenPositionCard,
  // SocialMediaComp,
  TabsSelector,
  TextHeading2,
  // TextHeading3,
  // UserBackground,
  UserMiniCard,
  // UserWithDescription,
} from "@eden/package-ui";
// import { STEPS } from "@eden/package-ui/utils/enums/fill-profile-steps";
import { useContext, useEffect, useState } from "react";
// import { GiExpand } from "react-icons/gi";
export interface IViewProjectContainerProps {
  step?: string | null;
  project?: Project;
  experienceOpen?: number | null;
  // eslint-disable-next-line no-unused-vars
  setExperienceOpen?: (val: number | null) => void;
}

export const ViewProjectContainer = ({
  step,
  project,
}: // project,
IViewProjectContainerProps) => {
  const { currentUser } = useContext(UserContext);

  const tabs = project?.role
    ? project?.role?.map((data: any) => `${data.title}`)
    : [];

  // console.log("tabs", tabs);
  const role = project?.role?.reduce((prev: any, curr: any) => {
    const item = { [`${curr.title}`]: curr };

    return { ...prev, ...item };
  }, {});

  const [activeTab, setActiveTab] = useState(0);
  const activeTabName = tabs ? tabs[activeTab] : "";
  const defaultRole = {
    title: "Role title",
    name: "Role Title",
  };

  const activeRole = role ? role[activeTabName] : defaultRole;

  useEffect(() => {
    // console.log("project", project);
  }, [project, project?.role]);
  return (
    <Card className="bg-white p-4">
      <p>Preview of your project:</p>
      <div className="h-8/10 scrollbar-hide w-full overflow-scroll p-2">
        <div
          className={`flex justify-between ${
            step == "1" || step == "4" ? "" : "blur-sm brightness-50"
          }`}
        >
          <div className={`flex flex-row`}>
            <div>
              <Avatar
                size="lg"
                isProject
                emoji={project?.emoji ? String(project?.emoji) : "👋"}
                backColorEmoji={`#ABF0B3`}
              />
            </div>
            <div className={`mx-4`}>
              <TextHeading2>{project?.title}</TextHeading2>
              <div className="text-soilGray/100	font-normal	tracking-wide">
                {project?.descriptionOneLine}
              </div>
              <div>
                {project?.role?.map((role: any, index: number) => (
                  <Badge
                    text={role?.title}
                    key={index}
                    className={`bg-soilPurple/20 py-px text-xs`}
                  />
                ))}
              </div>
            </div>
          </div>
          <div>
            <div className={`mt-6`}>
              <p className="text-soilPurple font-poppins text-4xl font-semibold">
                {/* {project.percentage} */}98%
              </p>
            </div>
          </div>
        </div>
        <div
          className={`grid grid-cols-3 ${
            step == "2" || step == "4" ? "" : "blur-sm brightness-50"
          }`}
        >
          <div className={`col-span-2`}>
            <div className={`mt-5 mb-2 flex uppercase`}>
              <p className="text-soilGray/100 font-medium tracking-wide">
                📃 Description of the project
              </p>
            </div>
            <div className="text-sm font-medium tracking-normal">
              {project?.description}
            </div>
          </div>
          <div className={`col-span-1`}>
            <div className={`my-4 flex uppercase`}>
              <p className="text-soilGray/100 font-medium tracking-wide">
                🏆 Champion
              </p>
            </div>
            <UserMiniCard member={currentUser} />
          </div>
        </div>
        {tabs?.length && (
          <div
            className={`mt-3 ${
              step == "3" || step == "4" ? "" : "blur-sm brightness-50"
            }`}
          >
            <TabsSelector
              tabs={tabs}
              selectedTab={activeTab}
              onSelect={(val) => {
                setActiveTab(val);
              }}
            />
            <div className="border-accentColor scrollbar-hide relative overflow-y-scroll rounded-b-xl border-b-2 border-r-2 border-l-2 bg-white px-4 pt-6">
              <div className="flex flex-col">
                <div className="flex flex-row content-center items-center justify-between">
                  <div className="flex flex-row">
                    <Avatar
                      size={`md`}
                      src={activeRole.avatar}
                      alt={"avatar"}
                    />
                    <div className="ml-3">
                      <div className="text-xl	font-medium	tracking-wide	">
                        {activeRole?.name}
                      </div>
                      <div className="text-soilGray/100	text-sm font-normal	tracking-wide">
                        {activeRole?.shortDescription}
                      </div>
                      {/* <div>
                    {activeRole?.skills?.map((item: any, index: any) => (
                      <Badge
                        text={item.skillData.name}
                        key={index}
                        className={`bg-soilPurple/20 py-px text-xs`}
                      />
                    ))}
                  </div> */}
                    </div>
                  </div>
                  <div className="flex flex-row">
                    <div className="text-soilPurple font-poppins mr-3 text-3xl font-bold">
                      59%
                    </div>
                    <div>
                      <div className="flex flex-col content-between justify-between">
                        <Button
                          variant="secondary"
                          radius="default"
                          size="sm"
                          // onClick={onRefer}
                        >
                          Refer 💸
                        </Button>
                        <Button
                          variant="secondary"
                          radius="default"
                          size="sm"
                          className="mt-2"
                          // onClick={() => onApply(role.title as string)}
                        >
                          Apply
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="text-soilGray/100 font-medium uppercase tracking-wide">
                    📃 Description Of the role
                  </div>
                  <div className="p-1 text-sm">{activeRole?.description}</div>
                </div>
                <div className="mb-3 flex flex-row justify-between">
                  <div>
                    <div className="text-soilGray/100 font-medium uppercase tracking-wide">
                      💯 Expectations
                    </div>
                    <div className="text-sm">
                      <li className="overflow-auto">
                        {activeRole?.expectations}
                      </li>
                    </div>
                  </div>
                  <div>
                    <div className="text-soilGray/100 font-medium uppercase tracking-wide">
                      🦜Benefits
                    </div>
                    <div className="text-sm">
                      <li>{activeRole?.benefits}</li>
                    </div>
                  </div>
                  <div>
                    <div className="text-soilGray/100 font-medium uppercase tracking-wide">
                      🕵️‍♀️Details
                    </div>
                    <div className="text-xs font-medium">
                      <div className="flex flex-row p-1">
                        <div>🕓</div>
                        <div className={`ml-1 capitalize text-slate-900	`}>
                          {`${activeRole?.hoursPerWeek} hours/week`}
                        </div>
                      </div>
                      <div className="flex flex-row p-1">
                        <div>💰</div>
                        <div className={`ml-1 capitalize text-slate-900`}>
                          {`TRST ${activeRole?.ratePerWeek} /week`}
                        </div>
                      </div>
                      <div className="flex flex-row p-1">
                        <div>🪑</div>
                        <div className={`ml-1 capitalize text-slate-900	`}>
                          ${activeRole?.openPositions} open position
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

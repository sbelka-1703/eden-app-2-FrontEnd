import { UserContext } from "@eden/package-context";
import { Maybe, NodesType, Project } from "@eden/package-graphql/generated";
import {
  Avatar,
  Badge,
  Card,
  CommonServerAvatarList,
  TabsSelector,
  TextHeading2,
  UserMiniCard,
} from "@eden/package-ui";
import { PROJECT_STEPS } from "@eden/package-ui/utils/enums/fill-project-steps";
import { Dispatch, SetStateAction, useContext } from "react";

export interface IViewProjectContainerProps {
  step?: PROJECT_STEPS;
  project?: Project;
  roleIndex: number;
  onSetRoleIndex: Dispatch<SetStateAction<number>>;
}

export const ViewProjectContainer = ({
  step,
  project,
  roleIndex,
  onSetRoleIndex,
}: IViewProjectContainerProps) => {
  const { currentUser } = useContext(UserContext);

  const tabs = project?.role
    ? project?.role?.map((data: any) => `${data.title}`)
    : [];

  // console.log("tabs", tabs);
  const role = project?.role?.reduce((prev: any, curr: any) => {
    const item = { [`${curr.title}`]: curr };

    return { ...prev, ...item };
  }, {});

  const activeTabName = tabs ? tabs[roleIndex] : "";
  const defaultRole = {
    title: "Role title",
    name: "Role Title",
  };

  const activeRole = role ? role[activeTabName] : defaultRole;

  return (
    <Card className="bg-white p-4">
      <p>Preview of your project:</p>
      <div className={`h-75 scrollbar-hide w-full overflow-scroll p-2`}>
        <div className={`flex justify-between`}>
          <div className={`flex flex-row`}>
            <div
              className={`${
                step === PROJECT_STEPS.START ||
                step === PROJECT_STEPS.ADD_ANOTHER_ROLE
                  ? ""
                  : "blur-sm brightness-50"
              }`}
            >
              <Avatar
                size="lg"
                isProject
                emoji={project?.emoji as string}
                backColorEmoji={
                  project?.backColorEmoji ? project?.backColorEmoji : `#e8e8e8`
                }
              />
            </div>
            <div className={`mx-4`}>
              <TextHeading2>{project?.title}</TextHeading2>
              <div
                className={`text-soilGray/100	font-normal	tracking-wide ${
                  step === PROJECT_STEPS.START ||
                  step === PROJECT_STEPS.DESCRIPTION ||
                  step === PROJECT_STEPS.ADD_ANOTHER_ROLE
                    ? ""
                    : "blur-sm brightness-50"
                }`}
              >
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
          <div
            className={`${
              step === PROJECT_STEPS.START ||
              step === PROJECT_STEPS.ADD_ANOTHER_ROLE
                ? ""
                : "blur-sm brightness-50"
            }`}
          >
            <CommonServerAvatarList
              label={`Servers`}
              size={`xs`}
              serverID={project?.serverID as string[]}
            />
          </div>
        </div>
        <div className={`grid grid-cols-3`}>
          <div
            className={`col-span-2 ${
              step === PROJECT_STEPS.DESCRIPTION ||
              step === PROJECT_STEPS.ADD_ANOTHER_ROLE
                ? ""
                : "blur-sm brightness-50"
            }`}
          >
            <div className={`mt-5 mb-2 flex uppercase`}>
              <p className="text-soilGray/100 font-medium tracking-wide">
                📃 Description of the project
              </p>
            </div>
            <div className="text-sm font-medium tracking-normal">
              {project?.description}
            </div>
          </div>
          <div
            className={`col-span-1 ${
              step !== PROJECT_STEPS.ADD_ANOTHER_ROLE
                ? "blur-sm brightness-50"
                : ""
            }`}
          >
            <div className={`my-4 flex uppercase`}>
              <p className="text-soilGray/100 font-medium tracking-wide">
                🏆 Champion
              </p>
            </div>
            <UserMiniCard member={currentUser} />
          </div>
        </div>
        {tabs?.length > 0 && (
          <div
            className={`mt-3 ${
              step === PROJECT_STEPS.ADD_ROLE ||
              step === PROJECT_STEPS.ADD_ANOTHER_ROLE
                ? ""
                : "blur-sm brightness-50"
            }`}
          >
            <TabsSelector
              key={roleIndex}
              tabs={tabs}
              selectedTab={roleIndex}
              onSelect={(val) => {
                onSetRoleIndex(val);
              }}
            />
            <div className="border-accentColor scrollbar-hide relative overflow-y-scroll rounded-b-xl border-b-2 border-r-2 border-l-2 bg-white px-4 pt-6">
              <div className="flex flex-col">
                <div className="flex flex-row content-center items-center justify-between">
                  <div className="flex flex-row">
                    <div>
                      <Avatar
                        size={`sm`}
                        src={activeRole?.avatar}
                        alt={"avatar"}
                      />
                    </div>
                    <div className="ml-3">
                      <div className="text-xl	font-medium	tracking-wide	">
                        {activeRole?.name}
                      </div>
                      <div className="text-soilGray/100	text-sm font-normal	tracking-wide">
                        {activeRole?.shortDescription}
                      </div>
                      <div>
                        {project?.role?.[roleIndex]?.nodes?.map(
                          (node: Maybe<NodesType>, index: number) => (
                            <Badge
                              text={node?.nodeData?.name || ""}
                              key={index}
                              className={`bg-soilPurple/20 py-px text-xs`}
                            />
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className={`my-4`}>
                  <div className="text-soilGray/100 my-1 font-medium uppercase tracking-wide">
                    📃 Description Of the role
                  </div>
                  <div className="text-darkGreen font-Inter my-2 text-sm tracking-wide">
                    {activeRole?.description}
                  </div>
                </div>

                <div className={`my-4`}>
                  <div className="text-soilGray/100 my-1 font-medium uppercase tracking-wide">
                    💯 Expectations
                  </div>
                  <div className="text-sm">
                    {activeRole?.expectations?.map(
                      (obj: string, index: number) => (
                        <li key={index} className="overflow-auto">
                          {obj}
                        </li>
                      )
                    )}
                  </div>
                </div>

                <div className="mb-3 grid grid-cols-3 gap-4">
                  <div className="col-span-2">
                    <div className="text-soilGray/100 my-1 font-medium uppercase tracking-wide">
                      🦜 Benefits
                    </div>
                    <div className="text-sm">
                      {activeRole?.benefits?.map(
                        (obj: string, index: number) => (
                          <li key={index} className="overflow-auto">
                            {obj}
                          </li>
                        )
                      )}
                    </div>
                  </div>
                  {(activeRole?.hoursPerWeek ||
                    activeRole?.ratePerHour ||
                    activeRole?.openPositions) && (
                    <div>
                      <div className="text-soilGray/100 my-1 font-medium uppercase tracking-wide">
                        🕵️‍♀️ Details
                      </div>
                      <div className="text-xs font-medium">
                        {activeRole?.hoursPerWeek && (
                          <div className="flex flex-row p-1">
                            <div>🕓</div>
                            <div className={`ml-1 capitalize text-slate-900	`}>
                              {`${activeRole?.hoursPerWeek} hours/week`}
                            </div>
                          </div>
                        )}
                        {activeRole?.ratePerHour && (
                          <div className="flex flex-row p-1">
                            <div>💰</div>
                            <div className={`ml-1 capitalize text-slate-900`}>
                              {`TRST ${activeRole?.ratePerHour} /week`}
                            </div>
                          </div>
                        )}
                        {activeRole?.openPositions && (
                          <div className="flex flex-row p-1">
                            <div>🪑</div>
                            <div className={`ml-1 capitalize text-slate-900	`}>
                              {`${activeRole?.openPositions} open position`}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

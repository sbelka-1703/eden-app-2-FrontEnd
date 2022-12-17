import {
  Maybe,
  NodesType,
  Project,
  RoleType,
} from "@eden/package-graphql/generated";
import {
  Avatar,
  Badge,
  Button,
  OpenPositionCard,
  TabsSelector,
} from "@eden/package-ui";
import { useState } from "react";
import { GiExpand } from "react-icons/gi";

export const OpenPositions = ({ project }: { project?: Project }) => {
  const [expand, setExpand] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  if (!project) return null;
  const tabs = project.role
    ? project?.role.map((data: any) => `${data.title}`)
    : [];
  const role = project.role
    ? project?.role.reduce((prev: any, curr: any) => {
        const item = { [`${curr.title}`]: curr };

        return { ...prev, ...item };
      }, {})
    : {};

  const activeRole = role[tabs[activeTab]];

  const onExpand = (role: string) => {
    console.log(role, "rolleeeee");
    const roleIndex = tabs.findIndex((tab: any) => tab === role);

    setActiveTab(roleIndex);
    setExpand(true);
  };

  return (
    <div>
      <div className={`my-4 flex`}>
        <p className="text-soilGray/100 font-medium uppercase tracking-wide">
          🎬 Open positions
        </p>
        {expand && (
          <Button style={{ border: "none" }} onClick={() => setExpand(false)}>
            <GiExpand size="15px" />
          </Button>
        )}
      </div>

      {expand ? (
        <PositionExpanded
          tabs={tabs}
          activeTab={activeTab}
          activeItem={activeRole}
          setActiveTab={setActiveTab}
        />
      ) : (
        <>
          <div
            className={`scrollbar-hide mb-4 flex flex-grow overflow-y-scroll`}
          >
            <div
              className={`grid grow grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3`}
            >
              {project?.role?.map((role: Maybe<RoleType>, index: any) => (
                <OpenPositionCard
                  padding="-m-4"
                  key={index}
                  role={role}
                  //   percentage={item.rolesPercentages[index] || 0}
                  onApply={onExpand}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const PositionExpanded = ({
  tabs,
  activeTab,
  activeItem,
  setActiveTab,
}: {
  tabs: string[];
  activeItem: RoleType;
  activeTab: number;
  // eslint-disable-next-line no-unused-vars
  setActiveTab: (activeTab: number) => void;
}) => {
  return (
    <>
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
              <div>
                <Avatar
                  size={`md`}
                  emoji={"💻"}
                  backColorEmoji={"#DDF9DE"}
                  alt={"avatar"}
                />
              </div>
              <div className="ml-3">
                <div className="text-xl	font-medium	tracking-wide	">
                  {activeItem.title}
                </div>
                <div className="text-soilGray/100	text-sm font-normal	tracking-wide">
                  {activeItem.description}
                </div>
                <div>
                  {activeItem.nodes &&
                    activeItem.nodes.map(
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
            <div className="p-1 text-sm">{activeItem?.description}</div>
          </div>
          <div className="mb-3 flex flex-row justify-between">
            <div>
              <div className="text-soilGray/100 font-medium uppercase tracking-wide">
                💯 Expectations
              </div>
              <div className="text-sm">
                <li>2 weekly sync calls</li>
                <li>leading a team of 10 people</li>
                <li>willing to learn</li>
              </div>
            </div>
            <div>
              <div className="text-soilGray/100 font-medium uppercase tracking-wide">
                🦜Benefits
              </div>
              <div className="text-sm">
                <li>yearly IRL events</li>
                <li>flexible schedule</li>
                <li>Paid in the native token</li>
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
                    {activeItem?.hoursPerWeek} hours/week
                  </div>
                </div>
                <div className="flex flex-row p-1">
                  <div>💰</div>
                  <div className={`ml-1 capitalize text-slate-900`}>
                    TRST ${activeItem?.budget?.totalBudget || "N/A"}
                  </div>
                </div>
                <div className="flex flex-row p-1">
                  <div>🗓</div>
                  <div className={`ml-1 capitalize text-slate-900	`}>
                    2 seasons
                  </div>
                </div>
                <div className="flex flex-row p-1">
                  <div>🪑</div>
                  <div className={`ml-1 capitalize text-slate-900	`}>
                    {activeItem?.openPositions} open position
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

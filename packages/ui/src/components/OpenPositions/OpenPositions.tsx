import { UserContext } from "@eden/package-context";
import {
  MatchProjectRoles,
  Maybe,
  NodesType,
  Project,
} from "@eden/package-graphql/generated";
import {
  Avatar,
  Badge,
  Button,
  CardGrid,
  LongText,
  Modal,
  OpenPositionCard,
  SendMessageToChampion,
  TabsSelector,
  TextLabel1,
  TextLabel2,
} from "@eden/package-ui";
import { useContext, useEffect, useState } from "react";
import { GiExpand } from "react-icons/gi";

import { round } from "../../../utils";

export interface IOpenPositionsProps {
  project?: Maybe<Project>;
  matchPercentage?: Maybe<number>;
  projectRoles?: Maybe<Array<Maybe<MatchProjectRoles>>>;
}

export const OpenPositions = ({
  project,
  projectRoles,
}: IOpenPositionsProps) => {
  const [expand, setExpand] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [allRoles, setAllRoles] = useState<MatchProjectRoles[]>([]);

  useEffect(() => {
    const roles = projectRoles ? [...projectRoles] : [];

    project?.role?.map((data) => {
      const role = roles?.find((role) => role?.projectRole?._id === data?._id);
      const addMatchProjectRole: MatchProjectRoles = {
        projectRole: data,
        matchPercentage: 0,
      };

      if (!role) roles?.push(addMatchProjectRole);
    });

    setAllRoles(roles as MatchProjectRoles[]);
  }, [projectRoles, project]);

  const tabs = allRoles
    ? allRoles?.map((data: any) => `${data.projectRole.title}`)
    : [];
  const role = allRoles
    ? allRoles?.reduce((prev: any, curr: any) => {
        const item = { [`${curr.projectRole.title}`]: curr };

        return { ...prev, ...item };
      }, {})
    : {};

  const activeRole = role[tabs[activeTab]];

  const onExpand = (role: string) => {
    // console.log(role, "rolleeeee");
    const roleIndex = tabs.findIndex((tab: any) => tab === role);

    setActiveTab(roleIndex);
    setExpand(true);
  };

  if (!allRoles) return null;

  return (
    <div>
      <div className={`my-4 flex`}>
        <TextLabel1>🎬 Open positions</TextLabel1>
        {expand && (
          <Button style={{ border: "none" }} onClick={() => setExpand(false)}>
            <GiExpand size="15px" />
          </Button>
        )}
      </div>

      {expand ? (
        <PositionExpanded
          project={project}
          tabs={tabs}
          activeTab={activeTab}
          activeItem={activeRole}
          setActiveTab={setActiveTab}
        />
      ) : (
        <>
          <div
            className={`scrollbar-hide mb-4 flex w-full flex-grow overflow-y-scroll`}
          >
            <CardGrid className={`w-full`}>
              {allRoles &&
                allRoles?.map((role: Maybe<MatchProjectRoles>, index: any) => (
                  <OpenPositionCard
                    padding="-m-4"
                    percentage={Number(role?.matchPercentage)}
                    key={index}
                    role={role?.projectRole}
                    onApply={onExpand}
                  />
                ))}
            </CardGrid>
          </div>
        </>
      )}
    </div>
  );
};

const PositionExpanded = ({
  project,
  tabs,
  activeTab,
  activeItem,
  setActiveTab,
}: {
  project?: Maybe<Project>;
  tabs: string[];
  activeItem: MatchProjectRoles;
  activeTab: number;
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const { currentUser } = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <div className={`h-6/10 my-6`}>
          <SendMessageToChampion
            project={project}
            role={activeItem?.projectRole}
          />
        </div>
      </Modal>
      <TabsSelector
        tabs={tabs}
        selectedTab={activeTab}
        onSelect={(val) => {
          setActiveTab(val);
        }}
      />

      <div className="border-accentColor scrollbar-hide relative overflow-y-scroll rounded-b-xl border-b-2 border-r-2 border-l-2 bg-white px-4 pt-6">
        <div className="flex flex-col">
          <div className="flex flex-row justify-between">
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
                  {activeItem?.projectRole?.title}
                </div>
                <div className={``}>
                  <LongText
                    cutText={100}
                    text={
                      (activeItem?.projectRole?.shortDescription as string) ||
                      ""
                    }
                    className={`text-soilGray/100	text-sm font-semibold	tracking-wide`}
                  />
                </div>
                <div>
                  {activeItem?.projectRole?.nodes &&
                    activeItem?.projectRole?.nodes.map(
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
            <div className="mt-4 flex flex-row gap-2 md:gap-8">
              {activeItem?.matchPercentage &&
              activeItem?.matchPercentage > 0 ? (
                <div className="text-soilPurple font-poppins mr-3 text-3xl font-bold">
                  {round(activeItem?.matchPercentage, 0)}%
                </div>
              ) : null}

              <div>
                <div className="flex flex-col">
                  {/* TODO: Refer feature is not developed yet */}

                  {/* <Button
                    variant="secondary"
                    radius="default"
                    size="sm"
                    // onClick={onRefer}
                  >
                    Refer 💸
                  </Button> */}
                  {currentUser && (
                    <Button
                      variant="secondary"
                      radius="default"
                      size="sm"
                      type={`button`}
                      className="mt-2"
                      onClick={() => setShowModal(!showModal)}
                    >
                      Apply
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className={`my-4`}>
            <TextLabel2>📃 Description Of the role</TextLabel2>
            <div className={``}>
              <LongText
                cutText={250}
                text={(activeItem?.projectRole?.description as string) || ""}
                className={`text-darkGreen font-Inter my-2 text-sm tracking-wide`}
              />
            </div>
          </div>
          <div className={`my-4`}>
            <TextLabel2>💯 Expectations</TextLabel2>
            <div className="text-sm">
              {activeItem?.projectRole?.expectations?.map(
                (expectation, index: number) => (
                  <li key={index}>{expectation}</li>
                )
              )}
            </div>
          </div>
          <div className={`my-4 grid grid-cols-4`}>
            <div className={`col-span-3`}>
              <TextLabel2>🦜Benefits</TextLabel2>
              <div className="text-sm">
                {activeItem?.projectRole?.benefits?.map(
                  (benefit, index: number) => (
                    <li key={index}>{benefit}</li>
                  )
                )}
              </div>
            </div>
            <div className={`col-span-1`}>
              <TextLabel2>🕵️‍♀️Details</TextLabel2>
              <div className="text-xs font-medium">
                {activeItem?.projectRole?.hoursPerWeek && (
                  <div className="flex flex-row p-1">
                    <div>🕓</div>
                    <div className={`ml-1 capitalize text-slate-900	`}>
                      {activeItem?.projectRole?.hoursPerWeek} hours/week
                    </div>
                  </div>
                )}
                {activeItem?.projectRole?.ratePerHour && (
                  <div className="flex flex-row p-1">
                    <div>💰</div>
                    <div className={`ml-1 capitalize text-slate-900`}>
                      TRST ${activeItem?.projectRole?.ratePerHour || "N/A"}
                    </div>
                  </div>
                )}
                {/* <div className="flex flex-row p-1">
                    <div>🗓</div>
                    <div className={`ml-1 capitalize text-slate-900	`}>
                      2 seasons
                    </div>
                  </div> */}
                {activeItem?.projectRole?.openPositions && (
                  <div className="flex flex-row p-1">
                    <div>🪑</div>
                    <div className={`ml-1 capitalize text-slate-900	`}>
                      {activeItem?.projectRole?.openPositions} open position
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

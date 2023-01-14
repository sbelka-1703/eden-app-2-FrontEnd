import { UserContext } from "@eden/package-context";
import {
  Avatar,
  Card,
  CommonServerAvatarList,
  NumberCircle,
  TextBody,
  TextHeading3,
} from "@eden/package-ui";
import { useRouter } from "next/router";
import { useContext } from "react";

export const ProjectChampionList = () => {
  // const { currentUser, selectedServerID } = useContext(UserContext);
  const { currentUser } = useContext(UserContext);

  const router = useRouter();

  // filter out of the current user's projects for projects they are a champion of
  const champions = currentUser?.projects?.filter(
    (project) => project?.champion
  );

  // find the serverID from champions serverID array that matches the selectedServer id
  // const serverChampions = champions?.filter((champion) =>
  //   champion?.info?.serverID?.includes(selectedServer?._id as string)
  // );
  // const serverChampions = champions?.filter((champion) =>
  //   champion?.info?.serverID?.includes(selectedServerID)
  // );

  // const projectsToDisplay = selectedServerID ? serverChampions : champions;
  const projectsToDisplay = champions;

  return (
    <div
      className={`h-85 scrollbar-hide 3xl:w-1/2 m-auto flex w-full flex-col overflow-scroll p-2 lg:w-2/3`}
    >
      {projectsToDisplay?.map((item) => (
        <button
          key={item?.info?._id}
          onClick={() =>
            router.push(`/champion-board/recruit/${item?.info?._id}`)
          }
        >
          <Card shadow className={`my-2 bg-gray-50 p-6`}>
            <div className="flex items-center">
              <div>
                <Avatar
                  size="lg"
                  isProject
                  emoji={item?.info?.emoji as string}
                  backColorEmoji={item?.info?.backColorEmoji as string}
                />
              </div>

              <div className="ml-8 flex flex-col justify-between">
                <TextHeading3 className="mb-2">
                  {item?.info?.title}
                </TextHeading3>
                <div className={`flex`}>
                  <TextBody className="mb-2 flex">New applicants:</TextBody>
                  <NumberCircle
                    value={
                      item?.info?.team?.filter(
                        (team) => team?.phase === "engaged"
                      ).length || 0
                    }
                    color="#88A9FF"
                    className="ml-2 inline-block h-7 w-7 font-semibold text-white"
                  />
                </div>
                <div className={`flex`}>
                  <TextBody className="flex">New matches:</TextBody>
                  <NumberCircle
                    value={10}
                    color="#88A9FF"
                    className="ml-2 inline-block h-7 w-7 font-semibold text-white"
                  />
                </div>
              </div>
              <div className={`m-auto`}>
                <CommonServerAvatarList
                  label={`In servers:`}
                  size={`sm`}
                  serverID={item?.info?.serverID as string[]}
                />
              </div>
            </div>
          </Card>
        </button>
      ))}
    </div>
  );
};

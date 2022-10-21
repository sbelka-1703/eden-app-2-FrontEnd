import { UserContext } from "@eden/package-context";
import {
  Avatar,
  Card,
  NumberCircle,
  TextBody,
  TextHeading3,
} from "@eden/package-ui";
import { useRouter } from "next/router";
import { useContext } from "react";

export const ProjectChampionList = () => {
  const { currentUser } = useContext(UserContext);
  const router = useRouter();
  const champions = currentUser?.projects?.filter(
    (project) => project?.champion
  );

  return (
    <div
      className={`h-85 scrollbar-hide m-auto flex w-full flex-col overflow-scroll md:w-2/3 lg:w-1/2`}
    >
      {champions?.map((item) => (
        <button
          key={item?.info?._id}
          onClick={() =>
            router.push(`/champion-board/recruit/${item?.info?._id}`)
          }
        >
          <Card className={`my-4 bg-gray-50 p-6`}>
            <div className="flex items-center">
              <div
                className="flex h-24 w-24 items-center justify-center rounded-full text-5xl"
                style={{
                  backgroundColor: item?.info?.backColorEmoji || "#FFF",
                }}
              >
                {item?.info?.emoji ? item?.info?.emoji : <Avatar isProject />}
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
            </div>
          </Card>
        </button>
      ))}
    </div>
  );
};

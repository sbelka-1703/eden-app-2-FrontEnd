import { GrantTemplate, Maybe } from "@eden/package-graphql/generated";
import {
  Avatar,
  AvatarList,
  Badge,
  TextHeading2,
  TextHeading3,
} from "@eden/package-ui";

// import { round } from "../../../utils";

export interface IGrantsInfoProps {
  grant?: Maybe<GrantTemplate>;
}

export const GrantsInfo = ({ grant }: IGrantsInfoProps) => {
  if (!grant) return null;

  return (
    <div>
      <div className={`flex`}>
        <div>
          <Avatar isProject src={grant?.avatar as string} />
        </div>
        <div className={`ml-4`}>
          <div className={`text-darkGreen font-poppins text-xl font-semibold`}>
            {grant?.name}
          </div>
          <div className="flex text-sm text-zinc-400">
            {grant?.smallDescription}
          </div>
          <div className={``}>
            {grant?.tags && (
              <div>
                <div>
                  {grant &&
                    grant?.tags &&
                    grant?.tags
                      .slice(0, 6)
                      .map((tag, index) => (
                        <Badge
                          text={tag || ""}
                          key={index}
                          className={`bg-[#FF6F8980] py-px text-xs`}
                        />
                      ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className={`mt-4 grid gap-4 sm:grid-cols-3`}>
        <div className={`col-span-2`}>
          <div>
            <div
              className={`font-Inter text-md mb-2 font-medium text-zinc-400`}
            >
              📃 Description of the grant
            </div>
            <div className={`text-darkGreen`}>{grant?.description}</div>
          </div>
          <div>
            <div
              className={`font-Inter text-md my-2 font-medium text-zinc-400`}
            >
              💲 requirements for the grant
            </div>
            <div className={`list-disc`}>
              {grant?.requirments?.map((requirement, index) => (
                <li key={index} className={`text-darkGreen list-disc text-sm`}>
                  {requirement}
                </li>
              ))}
            </div>
          </div>
          <div>
            <div
              className={`font-Inter text-md my-2 font-medium text-zinc-400`}
            >
              🎀 application process & our support
            </div>
            <div className={`list-disc`}>
              {grant?.applicationProcess?.map((requirement, index) => (
                <li key={index} className={`text-darkGreen list-disc text-sm`}>
                  {requirement}
                </li>
              ))}
            </div>
          </div>
          <div>
            <div
              className={`font-Inter text-md my-2 font-medium text-zinc-400`}
            >
              🎊 D_D members who got aavE grant{" "}
            </div>
            {grant?.membersApplied && (
              <div className={`flex`}>
                <AvatarList
                  className="inline-block !w-auto !justify-start"
                  avatars={grant?.membersApplied
                    .slice(0, 5)
                    .map((member: any) => ({
                      size: "xs",
                      src: member?.discordAvatar,
                    }))}
                />
                {grant?.membersApplied.slice(5).length > 0 && (
                  <p className="text-soilGray ml-6 inline">
                    +{grant?.membersApplied.slice(8).length} more
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
        <div className={`col-span-1`}>
          <div
            className={`mb-4 w-full rounded-2xl bg-gradient-to-r from-[#00E0FD33] to-[#F800CD33] p-4 text-center shadow-md`}
          >
            <TextHeading2>{grant?.amount}</TextHeading2>
            <TextHeading3>🗓 by Dec 15th</TextHeading3>
          </div>
          {/* <div className={`my-4`}>
            <div className={`font-Inter text-md font-medium text-zinc-400`}>
              🎤 resources
            </div>
            <div className={`my-1 rounded-xl bg-blue-50 p-4 shadow-md`}>
            </div>
          </div> */}
          <div className={`my-4`}>
            <div className={`font-Inter text-md font-medium text-zinc-400`}>
              💪🏼 difficulty
            </div>
            <div
              className={`text-accentColor my-1 rounded-xl bg-blue-50 p-4 text-xl uppercase shadow-md`}
            >
              {grant?.difficulty}
            </div>
          </div>
          <div className={`my-4`}>
            <div className={`font-Inter text-md font-medium text-zinc-400`}>
              🎏 distributed
            </div>
            <div
              className={`text-accentColor my-1 rounded-xl bg-blue-50 p-4 text-xl uppercase shadow-md`}
            >
              {grant?.distributed || 0}/{grant?.maxDistributed}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

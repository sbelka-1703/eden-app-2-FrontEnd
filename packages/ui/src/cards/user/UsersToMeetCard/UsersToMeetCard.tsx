import { UserContext } from "@eden/package-context";
import {
  MatchMembersToSkillOutput,
  Maybe,
  Members,
} from "@eden/package-graphql/generated";
import { Card, MatchAvatar, MemberModal, TextHeading3 } from "@eden/package-ui";
import { useContext, useState } from "react";
import { BiRefresh } from "react-icons/bi";

export interface IUsersToMeetCardProps {
  title?: string;
  members?: Array<Maybe<MatchMembersToSkillOutput>>;
  refetchMatchMembers: () => void;
}

export const UsersToMeetCard = ({
  title = `Best people for you to meet:`,
  members,
  refetchMatchMembers,
}: IUsersToMeetCardProps) => {
  const { currentUser } = useContext(UserContext);

  const [selectedMember, setSelectedMember] = useState<Members | null>(null);
  const [selectedMemberPercentage, setSelectedMemberPercentage] =
    useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Card shadow className={`bg-white p-4`}>
      <div className={``}>
        <div className={`flex justify-between`}>
          <TextHeading3>{title}</TextHeading3>
          <div className={`text-sm text-zinc-500`}>Powered by Eden AI</div>
        </div>

        <div className={`mt-2 flex flex-wrap`}>
          {members &&
            members.map(
              (member: Maybe<MatchMembersToSkillOutput>, index: number) => {
                return (
                  <div key={index} className={``}>
                    {currentUser?._id !== member?.member?._id && index < 7 && (
                      <div
                        className={`mx-2 flex-col justify-center text-center`}
                      >
                        <div className={`mx-4`}>
                          <button
                            onClick={() => {
                              setIsModalOpen(true);
                              setSelectedMember(member?.member as Members);
                              setSelectedMemberPercentage(
                                member?.matchPercentage
                                  ?.totalPercentage as number
                              );
                            }}
                          >
                            <MatchAvatar
                              src={member?.member?.discordAvatar as string}
                              percentage={
                                member?.matchPercentage
                                  ?.totalPercentage as number
                              }
                              size={`md`}
                            />
                          </button>
                        </div>

                        <div className={`font-medium text-zinc-500`}>
                          @{member?.member?.discordName}
                        </div>
                        <div className={`text-xs font-medium text-zinc-600`}>
                          {member?.member?.memberRole?.title}
                        </div>
                      </div>
                    )}
                  </div>
                );
              }
            )}
          {currentUser?.nodes?.length === 0 && (
            <TextHeading3 className={`text-blue-700`}>
              Add Skills and Preferred Projects on Your Profile to find best
              matches
            </TextHeading3>
          )}
          {currentUser?.nodes?.length !== 0 && (
            <button onClick={() => refetchMatchMembers()} className={`mx-4`}>
              <BiRefresh className="text-3xl text-zinc-400" />
            </button>
          )}
        </div>
      </div>
      <MemberModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        member={selectedMember}
        percentage={selectedMemberPercentage}
      />
    </Card>
  );
};

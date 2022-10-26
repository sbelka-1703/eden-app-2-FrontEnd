import {
  Maybe,
  Members,
  SkillType_Member,
} from "@eden/package-graphql/generated";
import {
  Avatar,
  Button,
  Modal,
  SkillList,
  SocialMediaComp,
  TextHeading3,
  TextLabel,
} from "@eden/package-ui";

export interface ProfileModalProps {
  member: Maybe<Members>;
  openModal?: boolean;
  onInvite: () => void;
}

const filterSkills = (
  skills: Maybe<Maybe<SkillType_Member>[]>,
  level: string
) => {
  if (skills) return skills.filter((skill) => skill?.level === level);
};

export const ProfileModal = ({
  member,
  openModal,
  onInvite,
}: ProfileModalProps) => (
  <Modal open={openModal} closeOnEsc={false}>
    <div className="flex flex-col items-center justify-center">
      <div className="relative">
        <Avatar
          src={member?.discordAvatar || ""}
          alt={member?.discordName || ""}
        />
        <div className="absolute -right-28 top-2/4 -translate-y-2/4">
          <Button variant="primary" onClick={onInvite}>
            Invite
          </Button>
        </div>
      </div>
      <div className="flex">
        <TextHeading3>@{member?.discordName}</TextHeading3>
        <TextLabel className="mt-2">#{member?.discriminator}</TextLabel>
      </div>
      <TextHeading3 className="text-gray-400">
        {member?.memberRole?.title}
      </TextHeading3>
    </div>
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-8">
        <div>
          <p className="font-semibold">SHORT BIO</p>

          <p className="break-words text-justify">{member?.bio}</p>
        </div>
      </div>
      <div className="col-span-4 text-center">
        <div className={`text-lg font-semibold text-black/50`}>⚡️ Match</div>
        <div className={`text-soilPurple font-poppins text-3xl font-semibold`}>
          {65}%
        </div>
      </div>

      <div className="col-span-6">
        {member?.skills?.map((skill, index: number) => {
          return (
            <div className="mb-3" key={index}>
              <p className="font-semibold uppercase">{skill?.level}</p>
              <SkillList
                colorRGB={"215,215,255"}
                skills={
                  filterSkills(
                    member?.skills as Maybe<SkillType_Member>[],
                    `${skill?.level}`
                  ) as Maybe<SkillType_Member>[]
                }
              />
            </div>
          );
        })}
      </div>
      <div className="col-span-2">
        <SocialMediaComp links={member?.links} />
      </div>
      <div className="col-span-4">
        <p className="font-semibold">AVAILABILITY</p>

        <p className="text-lg">⏳ {member?.hoursPerWeek} hrs/ week</p>
        <p className="text-lg">💰 1700 $SEED</p>
      </div>
    </div>
  </Modal>
);

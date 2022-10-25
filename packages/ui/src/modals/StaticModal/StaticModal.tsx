import { Avatar, Badge, Button, Modal, TextHeading3 } from "@eden/package-ui";
import { CheckCircleIcon } from "@heroicons/react/solid";

export interface IStaticModalProps {
  item?: any;
  resultPopUpFlag?: any;
  open?: boolean;
  onClose?: () => void;
}

export const StaticModal = ({
  item,
  resultPopUpFlag,
  open,
  onClose,
}: IStaticModalProps) => {
  if (!item) return null;
  return (
    <Modal open={open} onClose={onClose}>
      <div className={`h-8/10 w-full`}>
        <div className="flex w-full justify-center">
          <div className={`my-auto mr-4`}>
            <Button variant="default" className="bg-soilYellow">
              Skip
            </Button>
          </div>

          <div>
            <Avatar size="lg" src={item?.picture || ""} />
          </div>
          <div className={`my-auto ml-4`}>
            <Button variant="primary" className="">
              <CheckCircleIcon width={20} className="mr-1" />
              Join
            </Button>
          </div>
        </div>
        <div className={`mt-2 text-center`}>
          <TextHeading3>{item?.name}</TextHeading3>
        </div>
        <div className="mb-4 flex items-start justify-between">
          <div className="flex flex-col items-start justify-center">
            <h1 className="text-soilHeading3 font-poppins font-medium">
              💻 about the
            </h1>
            <p className="text-soilBody font-Inter w-8/12 font-normal">
              {item?.description}
            </p>
          </div>
          {item.percentage && (
            <div className="mr-12">
              <h1 className="text-soilHeading3 font-poppins text-soilGray -ml-2 font-medium">
                ⚡️Match
              </h1>
              <p className="text-soilPurple font-poppins text-4xl font-semibold">
                {item.percentage}
              </p>
            </div>
          )}
        </div>

        {resultPopUpFlag?.type === "DAO" && <DaoFlagType item={item} />}
        {resultPopUpFlag?.type === "Project" && <ProjectFlagType item={item} />}
      </div>
    </Modal>
  );
};

///////////////////////// DAO Flag Type /////////////////////////

const DaoFlagType = ({ item }: IStaticCardTypeProps) => {
  return (
    <>
      <div className="flex w-full items-start justify-between gap-6">
        <div className="w-3/4">
          <p className="mb-3 text-sm font-semibold tracking-widest subpixel-antialiased">
            🛠 Matching Skills
          </p>
          <div>
            {item?.matchingSkills?.map((skill: string, index: number) => (
              <Badge
                text={skill}
                key={index}
                className={`bg-soilPurple/20 py-px text-xs`}
              />
            ))}
          </div>
        </div>
        <div className="w-3/4">
          <p className="mb-3 text-sm font-semibold tracking-widest subpixel-antialiased">
            🛠 Missing Skills
          </p>
          <div>
            {item?.missingSkills?.map((skill: string, index: number) => (
              <Badge
                text={skill}
                key={index}
                className={`bg-soilPurple/20 py-px text-xs`}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

interface IStaticCardTypeProps {
  item?: any;
}

///////////////////////// Project Flag Type /////////////////////////

const ProjectFlagType = ({ item }: IStaticCardTypeProps) => {
  return (
    <>
      <div className={`font-Inter text-sm text-zinc-500`}>🛠 Relevant Roles</div>
      <div>
        {item?.roles?.map((role: any, index: number) => (
          <Badge
            text={role?.name}
            key={index}
            className={`bg-soilPurple/20 py-px text-xs`}
          />
        ))}
      </div>
      <div className={`font-Inter my-2 text-sm text-zinc-500`}>
        👯‍♂️ Core Team
      </div>
      <div className="flex w-full flex-nowrap">
        {item?.coreTeamPicture?.map((avatar: string, index: number) => (
          <div key={index} className={`-mr-3`}>
            <Avatar size={`xs`} src={avatar} alt={"avatar"} />
          </div>
        ))}
      </div>
      <div className={`font-Inter mt-2 text-sm text-zinc-500`}>
        Eden adoptiopn in Bankless is {item?.edenMembersDAO}%
      </div>
    </>
  );
};

import { AvatarList, AvatarProps, Card } from "@eden/package-ui";

type EndorsedSkill = {
  name: string;
  endorsedBy: AvatarProps[];
};
export interface EndorsementsProps {
  endorsements: EndorsedSkill[];
  shadow?: boolean;
}

export const EndorsementsCard: React.FC<EndorsementsProps> = ({
  endorsements,
  shadow = true,
}) => {
  return (
    <Card shadow={shadow}>
      <div className="flex flex-col items-center justify-start">
        <h1 className="text-xl font-bold uppercase text-black">endorsed for</h1>
        <div className="flex flex-wrap">
          {endorsements?.map((endorsement: EndorsedSkill, index: number) => (
            <div
              key={index}
              className="m-4 flex flex-col items-center justify-start"
            >
              <h3 className="text-lg uppercase text-black">
                {endorsement?.name}
              </h3>
              <AvatarList avatars={endorsement?.endorsedBy} />
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

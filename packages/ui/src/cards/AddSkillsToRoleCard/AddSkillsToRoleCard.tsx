import { Button, Card, TextHeading3 } from "ui";

export interface IAddSkillsToRoleCardProps {
  numberOfMembers: number;
  roleTitle: string;
  handleOpenSkillsModal: () => void;
}

export const AddSkillsToRoleCard = ({
  // eslint-disable-next-line no-unused-vars
  numberOfMembers,
  roleTitle,
  handleOpenSkillsModal,
}: IAddSkillsToRoleCardProps) => {
  return (
    <Card className="mb-8 flex items-center bg-white p-6">
      <div className="w-3/4">
        <TextHeading3>
          {`You’re looking at ${roleTitle} candidates in
                    Developer DAO. Please add desired skills to get best
                    results.`}
        </TextHeading3>
        <p className="text-soilGray text-sm">
          Choose just one role for now, you’ll be able to add more later.
        </p>
      </div>
      <Button
        className="ml-auto"
        variant="primary"
        onClick={handleOpenSkillsModal}
      >
        Add skills
      </Button>
    </Card>
  );
};

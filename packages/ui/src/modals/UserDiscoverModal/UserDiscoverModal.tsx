import {
  MatchPercentage,
  Maybe,
  Members,
} from "@eden/package-graphql/generated";
import { MemberInfo, Modal } from "@eden/package-ui";

export interface IUserDiscoverModalProps {
  member?: Members;
  matchPercentage?: Maybe<MatchPercentage>;
  resultPopUpFlag?: any;
  open?: boolean;
  onClose?: () => void;
}

export const UserDiscoverModal = ({
  member,
  open,
  onClose,
}: IUserDiscoverModalProps) => {
  if (!member) return null;
  return (
    <Modal open={open} onClose={onClose}>
      <div className={`h-8/10 scrollbar-hide w-full overflow-scroll`}>
        <MemberInfo member={member} />

        {/* <div className="flex w-full justify-center">
          <div className={`my-auto mr-4`}>
            <Button variant="default" className="bg-soilYellow">
              Skip
            </Button>
          </div>

          <div>
            <UserWithDescription member={member} />
          </div>
          <div className={`my-auto ml-4`}>
            <Button variant="primary" className="">
              <CheckCircleIcon width={20} className="mr-1" />
              Join
            </Button>
          </div>
        </div> */}
      </div>
    </Modal>
  );
};
